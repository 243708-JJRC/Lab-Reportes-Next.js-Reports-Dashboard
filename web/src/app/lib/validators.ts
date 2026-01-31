import { z } from "zod";

export const paginationSchema = z.object({
    limit: z.number().min(1).max(50),
    offset: z.number().min(0),
});
