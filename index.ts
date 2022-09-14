import dotenv from "dotenv";
import connectToDatabase from "./src/database/mongoose.database";

dotenv.config();
connectToDatabase();
