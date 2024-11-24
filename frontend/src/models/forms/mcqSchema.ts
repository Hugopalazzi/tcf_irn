import { z } from "zod";

export const listeningComprehensionSchema = z.object({
    userResponses: z.number().array(),
});
