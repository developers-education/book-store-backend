import { defineError, defineError2 } from '@/lib/errors/utils/define-error';
import { z } from 'zod';

export const [UserLoginTakenError, userLoginTakenApiErrorSchema] = defineError<{
  login: string;
}>(
  'LOGIN_TAKEN',
  z.object({
    login: z.string(),
  }),
);

type LoginTakenParams = {
  login: string;
};

export const LoginTakenError = defineError2<LoginTakenParams>('LOGIN_TAKEN', {
  login: z.string(),
});
