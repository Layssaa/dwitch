import { z } from "zod";

export const createUserValidator = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8),
});

export type ICreateUserValidator = z.infer<typeof createUserValidator>;