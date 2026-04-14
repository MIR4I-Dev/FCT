const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { getTickets, saveTickets } = require("../logic/tickets.js");
const {
  validateTicket,
  validatePartialTicket,
} = require("../schemas/tickets.js");
const { findAvailablePort } = require("../middlewares/free-port.js");
const PORT = process.env.PORT ?? 3000;

const app = express();
app.disable("x-powered-by");

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080",
        "http://localhost:1234",
      ];
      if (ACCEPTED_ORIGINS.includes(origin) || !origin)
        return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
  }),
);

app.get("/tickets", async (req, res) => {
  const { priority, status } = req.query;
  let filteredTickets = await getTickets();

  if (priority && status) {
    filteredTickets = filteredTickets.filter(
      (ticket) =>
        ticket.priority.toLocaleLowerCase() === priority.toLocaleLowerCase() &&
        ticket.status.toLocaleLowerCase() === status.toLocaleLowerCase(),
    );
  } else if (priority) {
    filteredTickets = filteredTickets.filter(
      (ticket) =>
        ticket.priority.toLocaleLowerCase() === priority.toLocaleLowerCase(),
    );
  } else if (status) {
    filteredTickets = filteredTickets.filter(
      (ticket) =>
        ticket.status.toLocaleLowerCase() === status.toLocaleLowerCase(),
    );
  }
  return filteredTickets.length > 0
    ? res.json(filteredTickets)
    : res.status(404).json({ message: "No tickets found" });
});

app.get("/tickets/:id", async (req, res) => {
  const { id } = req.params;
  const tickets = await getTickets();
  const ticket = tickets.find((ticket) => ticket.id === id);
  return ticket
    ? res.json(ticket)
    : res.status(404).json({ message: "Ticket not found" });
});

app.post("/tickets", async (req, res) => {
  const result = validateTicket(req.body);
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  const newTicket = { id: crypto.randomUUID(), ...result.data };
  const tickets = await getTickets();
  tickets.push(newTicket);
  await saveTickets(tickets);
  res.status(201).json(newTicket);
});

app.patch("/tickets/:id", async (req, res) => {
  const { id } = req.params;
  const result = validatePartialTicket(req.body);
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  const tickets = await getTickets();
  const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);
  if (ticketIndex === -1) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  const updatedTicket = { ...tickets[ticketIndex], ...result.data };
  tickets[ticketIndex] = updatedTicket;
  await saveTickets(tickets);
  res.status(200).json(updatedTicket);
});

app.delete("/tickets/:id", async (req, res) => {
  const { id } = req.params;
  const tickets = await getTickets();
  const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);
  if (ticketIndex === -1) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  tickets.splice(ticketIndex, 1);
  await saveTickets(tickets);
  res.status(204).send();
});

findAvailablePort(PORT).then((port) => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
