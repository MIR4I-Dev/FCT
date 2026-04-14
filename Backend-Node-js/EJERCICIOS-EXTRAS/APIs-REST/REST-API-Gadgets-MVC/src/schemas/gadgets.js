import { object, string, array, number, int, positive } from "zod";

const gadgetSchema = object({
  name: string({
    required_error: "Gadget name is required",
    invalid_type_error: "Gadget name must be a string",
  }).min(5, "Gadget name must be at least 5 characters long"),
  brand: string({
    required_error: "Gadget brand is required",
    invalid_type_error: "Gadget brand must be a string",
  }).min(2, "Gadget brand must be at least 2 characters long"),
  price: number({
    required_error: "Gadget price is required",
    invalid_type_error: "Gadget price must be a number",
  }).positive("Gadget price must be a positive number"),
  stock: number({
    required_error: "Gadget stock is required",
    invalid_type_error: "Gadget stock must be a number",
  })
    .int("Gadget stock must be an integer")
    .positive("Gadget stock must be a positive number"),
  categories: array(
    string({
      invalid_type_error: "Gadget category must be a string",
    }),
    {
      invalid_type_error: "Gadget categories must be an array of strings",
    },
  ).default([]),
});

export function validateGadget(gadget) {
  return gadgetSchema.safeParse(gadget);
}

export function validatePartialGadget(input) {
  return gadgetSchema.partial().safeParse(input);
}
