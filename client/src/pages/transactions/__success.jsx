import { Player } from "@lottiefiles/react-lottie-player";
import success from "../../assets/success.json";
import { Box, Typography } from "@mui/material";
import Title from "../../utils/Page_title";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Success = () => {
  Title("Payment Success");

  const { transaction } = useSelector((state) => state.transactions);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.state?.fromLocation === "/send-money") {
      setTimeout(() => {
        navigate("/transactions");
      }, 3000);
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Player
        src={success}
        className="player"
        keepLastFrame
        autoplay
        speed={1}
        style={{ width: 150, height: 150 }}
      />
      <Typography
        color="#1CBF74"
        textAlign="center"
        variant="h5"
        textTransform="uppercase"
        sx={{ my: 3 }}
      >
        Transaction successfull
      </Typography>
      <Typography textAlign="center" variant="subtitle">
        transaction id : {transaction?.transaction_id}
      </Typography>
      <Typography textAlign="center" variant="caption">
        Redirecting to transactions page
      </Typography>
    </Box>
  );
};

export default Success;
