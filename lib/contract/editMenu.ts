import z, { string } from "zod";

export const validator = z.object({
    menu: z.string(),
    title: z.string(),
    items: z.array(z.object({
        _id: z.string(),
        price: z.string(),
        description: z.string(),
        image: z.string(),
        name: z.string(),
    }))
});


export type Input = z.infer<typeof validator>;

export type Output = {};