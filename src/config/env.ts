import { getSecret } from "astro:env/server";
import z from "astro/zod";

const envSchema = z.object({
	LAST_UPDATE: z.coerce.number(),
});

export const env = envSchema.parse({
	LAST_UPDATE: getSecret("LAST_UPDATE"),
});
