import { z } from "zod";

export const subscribeValidator = z.object({
    channelId: z.string(),
});

export type ISubscribeValidator = z.infer<typeof subscribeValidator>;