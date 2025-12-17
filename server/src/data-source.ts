import "reflect-metadata";
import { DataSource } from "typeorm";
import { Ticket } from "./entity/Ticket.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin", // Matches POSTGRES_USER in docker-compose.yml
  password: "password123", // Matches POSTGRES_PASSWORD in docker-compose.yml
  database: "ticket_system_db", // Matches POSTGRES_DB in docker-compose.yml
  synchronize: true, // auto-creates tables (good for dev, bad for prod)
  logging: false,
  entities: [Ticket], // We will add User and Ticket entities here soon
  migrations: [],
  subscribers: [],
});
