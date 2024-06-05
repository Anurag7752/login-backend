const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes.js");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server Started Successfully on port ${PORT}`);
  }
});

mongoose
  .connect("mongodb://localhost:27017/jwt")
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
