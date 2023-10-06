require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json()); // parse json body data
app.use(express.urlencoded({ extended: true })); // parse urlencoded data

app.get("/", (req, res) => {
  res.send("Welcome to Indi-backend-assignment");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
