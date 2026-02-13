import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1),
  limit: z.coerce.number().int().min(1).max(50),
});


export const topLimitSchema = z.object({
  limit: z.coerce.number().int().min(1).max(20),
});

export const singleDateSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha inválida",
  }),
});