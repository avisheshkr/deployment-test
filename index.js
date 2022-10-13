import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("hello from the server");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
