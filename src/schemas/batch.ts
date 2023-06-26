import { z } from 'zod';

const Batch = z.object({
  name: z.string(),
  abv: z.optional(z.union([z.number(), z.string()])),
  description: z.optional(z.string()),
  empty: z.optional(z.string()),
  style: z.optional(z.string()),
  untappd: z.optional(z.string()),
  kegged: z.optional(z.string()),
  tap: z.optional(z.nullable(z.number())),
  status: z.enum(["kicked", "ontap", "fermenting", "planned"])
});

export default Batch;