import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletebranchStart, fetchAllbranchesStart } from "../../redux/branches/branches.slice";
import AlertUser from "../../utils/show_alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function DeleteModal({ openModal, setopenModel }) {
  const handleClose = () => setopenModel(false);

  const { branches } = useSelector((state) => state.branches);

  const params = useParams();

  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    page: 1,
    sort: "DESC",
    name: "",
  });

  useEffect(() => {
    dispatch(fetchAllbranchesStart(payload));
  }, [dispatch, payload]);

  const filteredBranches = branches?.filter((branch) => branch.branchId !== params.id);

  const [newBranch, setNewbranch] = useState("");

  const handleDelete = () => {
    const data = { new_branch: newBranch, curr_branch: params.id };
    for (const branch in data) {
      if (!data[branch]) {
        return AlertUser("Select branch to migrate", "error");
      }

      dispatch(deletebranchStart(data));
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Card>
              <CardContent>
                <Typography variant="h6" id="transition-modal-title" sx={{ my: 2 }}>
                  Select a branch to migrate all users
                </Typography>
                <FormControl fullWidth sx={{ my: 2 }}>
                  <InputLabel id="branch_name_label">Select Branch</InputLabel>
                  <Select
                    labelId="branch_name_label"
                    id="branch_name"
                    value={newBranch}
                    name="branch_name"
                    label="Select Branch *"
                    onChange={(e) => setNewbranch(e.target.value)}
                  >
                    <MenuItem disabled value="">
                      <em>Select Branch </em>
                    </MenuItem>
                    {branches?.length > 0 ? (
                      filteredBranches.map((branch) => {
                        return (
                          <MenuItem key={branch.branchId} value={branch.branchId}>
                            {branch.branch_name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem disabled value="">
                        <em>No branches available </em>
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
                <Button
                  variant="text"
                  onClick={() => {
                    setPayload({ ...payload, page: payload.page + 1 });
                    setNewbranch("");
                  }}
                >
                  <em>More branches </em>
                </Button>

                <Button variant="contained" color="error" onClick={handleDelete}>
                  Delete Branch
                </Button>
                <Typography color="error" id="transition-modal-description" sx={{ my: 2 }}>
                  Note : Branch will be deleted permanently
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
