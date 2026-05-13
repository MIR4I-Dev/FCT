import { object, string } from "zod";

const userRegisterSchema = object({
    username: string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
    }).min(3, "Username must be at least 3 characters long").trim(),
    email: string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email("Email is invalid").trim(),
    password: string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(6, "Password must be at least 6 characters long").trim(),
});

export function validateUserRegister(user) {
    return userRegisterSchema.safeParse(user);
}

const userLoginSchema = object({
    email: string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email("Email is invalid").trim(),
    password: string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(1, "Password must be at least 1 character long").trim(),
});

export function validateUserLogin(user) {
    return userLoginSchema.safeParse(user);
}

const submissionSchema = object({
    email: string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email("Email is invalid").trim(),
    description: string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
    }).min(10, "Description must be at least 10 characters long").trim(),
});

export function validateSubmission(submission) {
    return submissionSchema.safeParse(submission);
}

