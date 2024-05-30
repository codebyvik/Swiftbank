import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Fade, TextField, Backdrop, FormControl, Button } from "@mui/material";
import { useState } from "react";
import AlertUser from "../../utils/show_alert";
import { useDispatch } from "react-redux";
import { addMoneyStart } from "../../redux/transactions/transactions.slice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function AddMoney({ openModal, setopenModel }) {
  const handleClose = () => setopenModel(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [addMoneyDetails, setaddMoneyDetails] = useState({
    amount: "",
    description: "",
    transaction_PIN: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setaddMoneyDetails({ ...addMoneyDetails, [name]: value });
  };

  const handleAddMoney = () => {
    if (!addMoneyDetails.amount) {
      return AlertUser("Enter Amount", "error");
    }
    if (!addMoneyDetails.transaction_PIN) {
      return AlertUser("Enter Transaction PIN", "error");
    }

    const payload = {
      navigate,
      addMoneyDetails,
    };

    dispatch(addMoneyStart(payload));
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
            <Typography color="primary" textAlign="center" id="transition-modal-title" variant="h5">
              Add money
            </Typography>
            <FormControl sx={{ my: 4 }} fullWidth>
              <TextField
                variant="outlined"
                required
                id="Amount"
                label="Amount"
                name="amount"
                type="text"
                sx={{ my: 1 }}
                value={addMoneyDetails.amount}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                id="description"
                label="Description"
                name="description"
                type="text"
                sx={{ my: 1 }}
                value={addMoneyDetails.description}
                onChange={handleChange}
              />
              <TextField
                type="password"
                variant="outlined"
                required
                id="transaction_PIN"
                label="transaction PIN"
                name="transaction_PIN"
                sx={{ my: 1 }}
                value={addMoneyDetails.transaction_PIN}
                onChange={handleChange}
              />
              <Button
                onClick={handleAddMoney}
                sx={{ my: 1, maxWidth: "200px", marginX: "auto" }}
                variant="contained"
              >
                Add Money
              </Button>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
