import z from 'zod';

export const validator = z.object({
	email: z.string(),
	password: z.string(),
});

export type Input = z.infer<typeof validator>;

export type Output = {};
