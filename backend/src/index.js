const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./configs/db");
const cors = require("cors");
connectDB();

app.use(express.json());
app.use(cors());

//controllers
const { register, login } = require("./controllers/auth.controller");

const PORT = process.env.PORT || 3002;
app.listen(PORT, console.log(`server is running at port ${PORT}`));
