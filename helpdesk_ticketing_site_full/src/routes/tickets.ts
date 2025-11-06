import { Router } from "express";
import { prisma } from "../db";
import { sendTicketCreatedEmail } from "../email";

export const tickets = Router();

tickets.post("/", async (req, res) => {
  const { title, email, message } = req.body as { title: string; email: string; message?: string };
  if (!title || !email) return res.status(400).json({ error: "Missing title or email" });

  const created = await prisma.ticket.create({
    data: {
      title,
      email,
      messages: message ? { create: { author: "user", body: message } } : undefined,
    },
  });

  try { await sendTicketCreatedEmail(created.id, created.title, email); } catch (e) { console.error("Email error", e); }

  res.json(created);
});

tickets.get("/:id", async (req, res) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: req.params.id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!ticket) return res.status(404).json({ error: "Not found" });
  res.json(ticket);
});

tickets.get("/", async (req, res) => {
  const { search } = req.query as { search?: string };
  if (!search) {
    const latest = await prisma.ticket.findMany({ orderBy: { createdAt: "desc" }, take: 20 });
    return res.json(latest);
  }
  const t = await prisma.ticket.findUnique({ where: { id: search } });
  res.json(t ? [t] : []);
});

tickets.post("/:id/messages", async (req, res) => {
  const { author, body } = req.body as { author: "user" | "helpdesk"; body: string };
  if (!author || !body) return res.status(400).json({ error: "Missing author or body" });

  const exists = await prisma.ticket.findUnique({ where: { id: req.params.id } });
  if (!exists) return res.status(404).json({ error: "Ticket not found" });

  const msg = await prisma.message.create({ data: { ticketId: req.params.id, author, body } });

  if (author !== "helpdesk") {
    await prisma.ticket.update({ where: { id: req.params.id }, data: { status: "NEW_ALERT" } });
  }

  res.json(msg);
});

tickets.patch("/:id/status", async (req, res) => {
  const { status } = req.body as { status: "NEW" | "OPEN" | "PENDING" | "RESOLVED" | "NEW_ALERT" };
  const t = await prisma.ticket.update({ where: { id: req.params.id }, data: { status } });
  res.json(t);
});
