import { z } from 'zod';

export const searchPetSchema = z.object({
  query: z.string().min(1, 'Informe um termo para busca').optional()
});

export type SearchPetDto = z.infer<typeof searchPetSchema>;
