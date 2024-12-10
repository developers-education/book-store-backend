import { z } from 'zod';
import { UUID_EXAMPLE } from '@/shared/constants';
import { createZodDto } from '@/lib/zod-dto/dto-helpers';

const idParamSchema = z.object({
  id: z.string().uuid().openapi({ description: 'Id', example: UUID_EXAMPLE }),
});

export class IdParamDto extends createZodDto(idParamSchema) {}
