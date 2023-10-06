require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./utils/swaggerOptions");
const bookRoute = require("./routes/bookRoute");

const app = express();

app.use(express.json()); // parse json body data
app.use(express.urlencoded({ extended: true })); // parse urlencoded data
app.use(cookieParser()); // parse cookie

connectDB(); // connection to db

app.get("/", (req, res) => {
  res.send("Welcome to Indi-backend-assignment");
});

// all routes are here
app.use("/api/user", userRoute);
app.use("/api/book", bookRoute);

//swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

//error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
