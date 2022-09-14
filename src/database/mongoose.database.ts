import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(`Could not connect to MongoDB: ${err}`);
  }
};

export default connectToDatabase;
