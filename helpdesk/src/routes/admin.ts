import { Router } from "express";
import { prisma } from "../db";

export const admin = Router();

admin.get("/tickets", async (_req, res) => {
  const tickets = await prisma.ticket.findMany({
    orderBy: { updatedAt: "desc" },
    include: { messages: { orderBy: { createdAt: "desc" }, take: 1 } },
  });
  res.json(tickets);
});
