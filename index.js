import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from "./database/db.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/uploads", express.static("uploads"));

// importing routes
import userRoutes from "./routes/user.js";
import eventsRoutes from "./routes/events.js";
import adminRoutes from "./routes/admin.js";
import merchRoutes from "./routes/merchandise.js";


// using routes
app.use("/api", userRoutes);
app.use("/api", eventsRoutes);
app.use("/api", adminRoutes);
app.use("/api", merchRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});