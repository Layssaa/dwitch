import { z } from "zod";

export const createChannelValidator = z.object({
    name: z.string(),
    about: z.string(),
});

export type ICreateChannelValidator = z.infer<typeof createChannelValidator>;