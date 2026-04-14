const fs = require("node:fs/promises");
const path = require("node:path");

const filePath = path.join(process.cwd(), "mocks", "tickets.json");

async function getTickets() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveTickets(tickets) {
  await fs.writeFile(filePath, JSON.stringify(tickets, null, 2));
}

module.exports = { getTickets, saveTickets };
