import { z, ZodSchema } from 'zod';
import { AppError } from '@/lib/errors/app-error';
import { apiErrorSchema } from '@/lib/errors/schemas/api-error.schema';
import { ZodRawShape } from 'zod/lib/types';

export function defineError<Params = undefined>(
  name: string,
  dataSchema?: ZodSchema,
): [ErrorClass<Params>, ErrorApiSchema] {
  const errorClass = class extends AppError {
    constructor(params?: Params) {
      super(name, params ?? {});
    }
  };

  const errorApiSchema = apiErrorSchema.extend({
    statusMessage: z.literal(name),
    data: dataSchema ?? z.object({}),
  });

  return [errorClass as unknown as ErrorClass<Params>, errorApiSchema];
}

export function defineError2<Params = undefined>(
  name: string,
  shape?: ZodRawShape,
): ErrorClass<Params> {
  const apiSchema = apiErrorSchema.extend({
    statusMessage: z.literal(name),
    data: z.object({ ...shape }),
  });

  return class extends AppError {
    static schema = apiSchema;

    constructor(params?: Params) {
      super(name, params ?? {});
    }
  } as unknown as ErrorClass<Params>;
}

type ErrorApiSchema = ZodSchema;
type ErrorClass<Params> = Params extends undefined
  ? (new () => AppError) & { schema: ErrorApiSchema }
  : (new (params: Params) => AppError) & { schema: ErrorApiSchema };
