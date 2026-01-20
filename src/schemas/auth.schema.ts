import { z } from 'zod'

export const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string({ required_error: t('validation.emailRequired') })
      .min(1, t('validation.emailMin'))
      .email(t('validation.emailInvalid')),
    password: z
      .string({ required_error: t('validation.passwordRequired') })
      .min(8, t('validation.passwordMin')),
  })
}
