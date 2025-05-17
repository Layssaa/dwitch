import { z } from "zod";

export const loginUserValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type ILoginUserValidator = z.infer<typeof loginUserValidator>;