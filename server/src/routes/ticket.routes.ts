import { Router } from "express";
import { TicketController } from "../controller/TicketController.js";

const router = Router();

// GET /api/tickets -> Get all tickets
router.get("/", TicketController.getAll);

// POST /api/tickets -> Create a new ticket
router.post("/", TicketController.create);

export default router;
