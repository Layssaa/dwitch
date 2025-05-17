import { z } from "zod";

export const deleteUserValidator = z.object({
    userId: z.string(),
});

export type IDeleteUserValidator = z.infer<typeof deleteUserValidator>;