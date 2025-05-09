import { z } from "zod";

export const validateIdSchema = z.object({ id: z.number().int() });
