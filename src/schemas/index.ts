import { z } from "zod";

export const commentValidationSchema = z.object({
  comment: z.string().trim().min(1, "please enter a comment"),
});

