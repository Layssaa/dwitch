import { z } from "zod";

export const createBroadcastValidator = z.object({
    channelId: z.string(),
});

export const finishedBroadcastValidator = z.object({
    broadcastId: z.string(),
});


export type ICreateBroadcastValidator = z.infer<typeof createBroadcastValidator>;
export type IFinishedBroadcastValidator = z.infer<typeof finishedBroadcastValidator>;
