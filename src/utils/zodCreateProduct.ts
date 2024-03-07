import { z } from 'zod';

export const schema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  brand: z.string().nonempty('Campo obrigatório'),
  model: z.string().nonempty('Campo obrigatório'),
  variants: z.array(
    z.object({
      color: z.string().nonempty('Campo obrigatório'),
      price: z.string().nonempty('Campo obrigatório'),
    }),
  ).nonempty(),
});

export type formFields = z.infer<typeof schema>
