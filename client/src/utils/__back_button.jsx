import { ArrowBackIos } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const BackButton = ({ location }) => {
  return (
    <Link to={location}>
      <Button startIcon={<ArrowBackIos />}>Back</Button>
    </Link>
  );
};

export default BackButton;
