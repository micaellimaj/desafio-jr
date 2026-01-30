import { z } from 'zod'

// Auth schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// Pet schemas
export const petSchema = z.object({
  name: z
    .string()
    .min(1, 'Pet name is required')
    .min(2, 'Pet name must be at least 2 characters')
    .max(50, 'Pet name must be less than 50 characters'),
  species: z.enum(['Dog', 'Cat'], {
    errorMap: () => ({ message: 'Please select a species (Dog or Cat)' }),
  }),
  breed: z
    .string()
    .min(1, 'Breed is required')
    .max(50, 'Breed must be less than 50 characters'),
  age: z
    .number({ invalid_type_error: 'Age must be a number' })
    .min(0, 'Age cannot be negative')
    .max(100, 'Age must be less than 100'),
})

// Search schema
export const searchSchema = z.object({
  query: z.string().max(100, 'Search query too long'),
})

// Type exports from schemas
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type PetFormData = z.infer<typeof petSchema>
export type SearchFormData = z.infer<typeof searchSchema>
