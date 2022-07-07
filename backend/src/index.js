const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./configs/db");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);
const session = require("express-session");
connectDB();

app.use(express.json());
app.use(cors());

//controllers
const scoreController = require("./controllers/score.controller");
const { register, login } = require("./controllers/auth.controller");

app.post("/register", register);
app.post("/login", login);
app.post("/score", scoreController);
app.get("/score", scoreController);
app.delete("/score", scoreController);

//sessions
app.use(
  session({
    secret: "asraf3456",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

const PORT = process.env.PORT || 3002;
app.listen(PORT, console.log(`server is running at port ${PORT}`));
