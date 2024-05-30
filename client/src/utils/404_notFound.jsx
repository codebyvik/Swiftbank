import { Box, Typography } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import notfound from "../assets/Not_found.json";

const NotFound = () => {
  return (
    <Box sx={{ width: { xs: "100%", md: "60%" }, margin: "auto" }}>
      <Player
        src={notfound}
        className="player"
        loop
        autoplay
        speed={1}
        style={{ maxWidth: "400px", maxHeight: "400px" }}
      />
      <Typography textAlign="center" color="primary" variant="h4" fontWeight={400}>
        Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;
