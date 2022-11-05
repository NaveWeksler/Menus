import z from "zod";

export const validator = z.object({
  title: z.string()
});


export type Input = z.infer<typeof validator>;

export type Output = {id: string};