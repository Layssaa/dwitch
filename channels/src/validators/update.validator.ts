import { z } from "zod";

export const updateChannelValidator = z.object({
    channelId: z.string(),
    name: z.string().optional(),
    about: z.string().optional(),
});

export type IUpdateChannelValidator = z.infer<typeof updateChannelValidator>;