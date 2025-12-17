import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum TicketPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum TicketStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number; // <--- Added !

  @Column({ type: "varchar" })
  title!: string; // <--- Added !

  @Column("text")
  description!: string; // <--- Added !

  @Column({
    type: "enum",
    enum: TicketPriority,
    default: TicketPriority.LOW,
  })
  priority!: TicketPriority; // <--- Added !

  @Column({
    type: "enum",
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status!: TicketStatus; // <--- Added !

  @CreateDateColumn()
  createdAt!: Date; // <--- Added !

  @UpdateDateColumn()
  updatedAt!: Date; // <--- Added !
}
