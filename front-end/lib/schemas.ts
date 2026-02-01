import { z } from 'zod'

// Schemas de Autenticação
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Por favor, insira um endereço de e-mail válido'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'O nome é obrigatório')
      .min(2, 'O nome deve ter pelo menos 2 caracteres')
      .max(100, 'O nome deve ter menos de 100 caracteres'),
    email: z
      .string()
      .min(1, 'O e-mail é obrigatório')
      .email('Por favor, insira um endereço de e-mail válido'),
    password: z
      .string()
      .min(1, 'A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número'
      ),
    confirmPassword: z.string().min(1, 'Por favor, confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

// Schemas de Pets
export const petSchema = z.object({
  name: z.string().min(1, 'O nome do pet é obrigatório'),
  age: z.coerce.number().int().min(0, 'A idade não pode ser negativa'),
  type: z.enum(['GATO', 'CACHORRO'], {
    errorMap: () => ({ message: 'Selecione GATO ou CACHORRO' }),
  }),
  breed: z.string().min(1, 'A raça é obrigatória'),
  ownerName: z.string().min(1, 'O nome do dono é obrigatório'),
  ownerContact: z.string().min(1, 'O contato do dono é obrigatório'),
});


// Schema para validação de imagem no Client-side
export const petImageSchema = z.object({
  file: z
    .any()
    .refine((file) => file?.size <= 5000000, `O tamanho máximo é 5MB.`)
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file?.type),
      "Apenas .jpg, .jpeg, .png e .webp são aceitos."
    ),
})

// Schema de Busca
export const searchSchema = z.object({
  query: z.string().max(100, 'A consulta de busca é muito longa'),
})

// Exportação de tipos baseados nos schemas
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type PetFormData = z.infer<typeof petSchema>
export type SearchFormData = z.infer<typeof searchSchema>
export type PetImageFormData = z.infer<typeof petImageSchema>