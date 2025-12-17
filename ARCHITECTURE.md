Here is the completely rewritten **System Architectural Design Document (SADD)**, updated to reflect the cutting-edge stack (Angular 21, Postgres 18) and modern design patterns.

You can paste this directly into `ARCHITECTURE.md`.

---

# System Architectural Design: Enterprise Ticketing System

## 1. Executive Summary

This document outlines the architectural design for a full-stack internal ticketing system. The application is designed to facilitate issue tracking, task assignment, and workflow management within an organization. The system utilizes a **modern, cloud-native architecture**, prioritizing strict typing, reactive state management (Signals), and containerized infrastructure.

## 2. High-Level Architecture

The system follows a modern **Three-Tier Architecture** pattern, separating concerns into Presentation, Application, and Data layers.

### 2.1 Presentation Layer (Frontend)

- **Framework:** **Angular 21**
- **Responsibility:** Handles user interaction, state management, and view rendering.
- **Key Design Decisions:**
- **Zoneless Architecture:** Leveraging Angular 21's zoneless change detection for maximum performance and reduced overhead (no `zone.js`).
- **Signal-Based State:** Exclusive use of **Signals** for local and global state management, replacing legacy RxJS chains for synchronous data flows.
- **Standalone Components:** Fully modular architecture (no NgModules), enabling tree-shakable builds and faster load times.
- **Strict Mode:** Full template type checking enabled.

### 2.2 Application Layer (Backend)

- **Runtime:** Node.js with TypeScript (ES Modules).
- **Framework:** Express.js.
- **Pattern:** MVC (Model-View-Controller) with Repository Pattern via TypeORM.
- **Responsibility:** Business logic, request validation, and database orchestration.
- **API Standard:** RESTful API (JSON) with strict DTO validation.

### 2.3 Data Layer (Database)

- **Database:** **PostgreSQL 18**
- **Infrastructure:** Dockerized container managed via Docker Compose.
- **ORM:** TypeORM (Code-First approach).
- **Storage:** Persistent Docker volumes (`pgdata`).
- **Optimization:** Utilization of Postgres 18's advanced query planner and JSONB enhancements for flexible data storage where relational schemas are too rigid.

---

## 3. Database Design (Schema)

The database utilizes a relational model to ensure ACID compliance and referential integrity.

### 3.1 Entities

- **User**
- `id` (PK), `email` (Unique), `password_hash`, `role` (Admin/User).
- _Relationship:_ One User has Many Tickets.

- **Ticket**
- `id` (PK), `title`, `description` (Text), `priority` (Enum), `status` (Enum).
- `created_at`, `updated_at` (Auto-managed timestamps).
- _Relationship:_ A Ticket belongs to one User (Assignee/Reporter).

### 3.2 Data Integrity

- **Enums:** Strict enforcement of `Priority` (LOW, MEDIUM, HIGH) and `Status` (OPEN, IN_PROGRESS, CLOSED) at the database level.
- **Foreign Keys:** Cascading constraints or protected references to maintain historical data integrity.

---

## 4. API Design Strategy

The backend exposes a RESTful interface. Routes are versioned (e.g., `/api/v1/`) to allow future scalability without breaking clients.

| Method   | Endpoint           | Description                                           | Access         |
| -------- | ------------------ | ----------------------------------------------------- | -------------- |
| `GET`    | `/api/tickets`     | Retrieve all tickets (pagination/filtering supported) | Auth Required  |
| `POST`   | `/api/tickets`     | Create a new ticket                                   | Auth Required  |
| `GET`    | `/api/tickets/:id` | Retrieve single ticket details                        | Auth Required  |
| `PATCH`  | `/api/tickets/:id` | Update status or assignee                             | Assignee/Admin |
| `DELETE` | `/api/tickets/:id` | Soft delete or remove ticket                          | Admin only     |

---

## 5. Security & Deployment

### 5.1 Authentication & Authorization

- **Strategy:** JWT (JSON Web Tokens).
- **Flow:** Stateless authentication. The client attaches `Bearer <token>` to requests via a functional HttpInterceptor.
- **Password Storage:** Bcrypt/Argon2 hashing before persistence.

### 5.2 Containerization (DevOps)

- **Docker Compose:** Orchestrates the multi-container environment (Node API + Postgres DB).
- **Environment Variables:** Sensitive credentials (`DB_PASSWORD`, `JWT_SECRET`) are managed via `.env` files and excluded from version control.
- **CI/CD:** GitHub Actions pipeline configured for linting and type-checking on pull requests.

---

## 6. Future Scalability & Roadmap

- **Migration Path:** The modular controller-service structure allows specific modules (e.g., Notification Service) to be extracted into microservices if load increases.
- **Caching:** Redis implementation planned for caching frequently accessed ticket lists.
- **Real-time:** Websocket integration (Socket.io) for live ticket updates (e.g., "User X is typing...").
