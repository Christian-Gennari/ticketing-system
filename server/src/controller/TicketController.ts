import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Ticket } from "../entity/Ticket.js";

export class TicketController {
  // 1. Get all tickets
  static getAll = async (req: Request, res: Response) => {
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const tickets = await ticketRepository.find();
    res.send(tickets);
  };

  // 2. Create a new ticket
  static create = async (req: Request, res: Response) => {
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const { title, description, priority } = req.body;

    const ticket = new Ticket();
    ticket.title = title;
    ticket.description = description;
    ticket.priority = priority;
    // status, createdAt, etc., are auto-generated

    try {
      await ticketRepository.save(ticket);
      res.status(201).send(ticket);
    } catch (error) {
      res.status(500).send("Error saving ticket");
    }
  };
}
