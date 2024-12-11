import 'zod-openapi/extend';
import { bootstrap } from '@/bootstrap';
import { patchNestJsSwagger } from '@/lib/zod-dto/patch-nest-swagger';

// process.setMaxListeners(12);
process.on('warning', (e) => console.warn(e.stack));

patchNestJsSwagger();
bootstrap();
