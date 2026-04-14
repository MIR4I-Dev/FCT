const z = require("zod");

const ticketSchema = z.object({
  title: z
    .string({
      required_error: "Ticket title is required",
      invalid_type_error: "Ticket title must be a string",
    })
    .min(5, "Ticket title must be at least 5 characters long"),
  description: z
    .string({
      required_error: "Ticket description is required",
      invalid_type_error: "Ticket description must be a string",
    })
    .min(10, "Ticket description must be at least 10 characters long"),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Ticket priority is required",
    invalid_type_error: "Ticket priority must be a string",
  }),
  status: z.enum(["open", "in-progress", "closed"]).default("open"),
  tags: z
    .array(
      z.string({
        invalid_type_error: "Ticket tag must be a string",
      }),
      {
        invalid_type_error: "Ticket tags must be an array of strings",
      },
    )
    .optional(),
});

function validateTicket(ticket) {
  return ticketSchema.safeParse(ticket);
}

function validatePartialTicket(input) {
  return ticketSchema.partial().safeParse(input);
}

module.exports = { validateTicket, validatePartialTicket };
