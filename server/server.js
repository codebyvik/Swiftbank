const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server is running at port : ${process.env.SERVER_PORT}`);
});
