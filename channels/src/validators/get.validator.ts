import { z } from "zod";

export const getChannelValidator = z.object({
    channelId: z.string(),
});

export type IGetChannelValidator = z.infer<typeof getChannelValidator>;