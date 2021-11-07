require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const errorMiddleware = require("./middlewares/error-middleware")
const authrouter = require("./router/auth_router");
const dataManagerouter = require("./router/data-manage_router");
const chatsrouter = require("./router/chats_routes");
const followrouter = require("./router/follow_router");
const postrouter = require("./router/post_router");
const path = require("path")

const url = process.env.DB_URL;

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.use("/api", (req, res, next) => {
  // console.log("request");
  next();
});

app.use("/api", postrouter)
app.use("/api", followrouter)
app.use("/api", chatsrouter)
app.use("/api", authrouter);
app.use("/api", dataManagerouter)
app.use(errorMiddleware)

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "..", "client", "build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
  })
}

async function start() {
  try {
     await mongoose.connect(url, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
    });
    console.log("connected");
    app.listen(PORT, () =>
      console.log("app is listening on port " + PORT + "..."),
    );
  } catch (e) {
    console.log(e);
  }
}

start();
