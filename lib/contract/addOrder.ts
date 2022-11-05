import z from "zod";

export const validator = z.object({
    menu: z.string(),
    order: z.array(z.string())
});

export type Input = z.infer<typeof validator>;

export type Output = {};