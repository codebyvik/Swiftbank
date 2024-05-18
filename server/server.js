const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes/index"));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server is running at port : ${process.env.SERVER_PORT}`);
});
