import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To MongoDB Database ${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Error in MongoDB: ${error}`);
  }
};

export default connectDB;
