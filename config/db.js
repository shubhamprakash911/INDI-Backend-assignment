const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const isConnect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${isConnect.connection.host}`);
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};
module.exports = connectDB;
