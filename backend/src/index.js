const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const connectDB = require("./configs/db");
const cors = require("cors");
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
connectDB();

app.use(express.json());
app.use(cors());

//controllers
const scoreController = require("./controllers/score.controller");
const { register, login, getUser } = require("./controllers/auth.controller");

app.post("/register", register);
app.get("/users", getUser);
app.post("/login", login);
app.use("/score", scoreController);

//sessions
// app.use(
//   session({
//     secret: "asraf3456",
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   })
// );

const PORT = process.env.PORT || 3002;
app.listen(PORT, console.log(`server is running at port ${PORT}`));
