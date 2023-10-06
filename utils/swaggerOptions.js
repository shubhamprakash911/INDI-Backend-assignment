const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "INDI backend assignemnt",
      version: "0.1.0",
      description:
        "This is a Book library API application made with Express,MongoDB and documented with Swagger",
    },
    servers: [
      { url: "https://indi-backend-assignment.onrender.com" }, //use localhost instead of deploy url when running this project locally
    ],
  },
  apis: ["./models/*.js", "./controllers/*.js"],
};

module.exports = swaggerOptions;
