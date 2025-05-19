import { z } from "zod";

export const createBroadcastValidator = z.object({
    channelId: z.string(),
});

export type ICreateBroadcastValidator = z.infer<typeof createBroadcastValidator>;