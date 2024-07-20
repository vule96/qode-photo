import z from 'zod';
import { STRONG_PASSWORD_REGEX } from '../regex';

export const loginSchema = z.object({
  email: z.string({ message: 'Please enter email' }).email(),
  password: z
    .string({ message: 'Please enter password' })
    .regex(STRONG_PASSWORD_REGEX, {
      message:
        'Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
    }),
});

export const registerSchema = loginSchema.extend({});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = LoginFormData;

export const uploadSchema = z.object({
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false;
      if (val.some((file) => !(file instanceof File))) return false;
      return true;
    }, 'Please select images')
    .default(null),
});

export type UploadFormData = z.infer<typeof uploadSchema>;

export const commentSchema = z.object({
  content: z.string({ message: 'Please enter comment' }),
});

export type CommentFormData = z.infer<typeof commentSchema>;
