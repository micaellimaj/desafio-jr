import { z } from 'zod';

export const searchPetSchema = z.object({
  query: z.string('Informe um termo para busca').optional()
});

export type SearchPetDto = z.infer<typeof searchPetSchema>;
