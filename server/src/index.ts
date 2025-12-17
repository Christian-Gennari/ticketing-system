import express from "express";
import { AppDataSource } from "./data-source.js";
import ticketRoutes from "./routes/ticket.routes.js"; // <--- 1. Import

const app = express();
app.use(express.json());

// <--- 2. Register the routes
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("Ticketing System API (ESM) is running!");
});

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
