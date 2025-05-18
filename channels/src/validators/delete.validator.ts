import { z } from "zod";

export const deleteChannelValidator = z.object({
    channelId: z.string(),
});

export type IDeleteChannelValidator = z.infer<typeof deleteChannelValidator>;