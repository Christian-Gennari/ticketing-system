import express from "express";
import { AppDataSource } from "./data-source.js"; // Note the .js extension!

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ticketing System API (ESM) is running!");
});

// Initialize the Database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized! 📦");
    app.listen(3000, () => {
      console.log("Server is running on port 3000 🚀");
    });
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err);
  });
