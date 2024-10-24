import process from 'node:process';
import 'zod-openapi/extend';
import './common/base-path';
import { IAppDatabase } from '@/infrastructure/database/types/database.types';
import { IWebServer } from '@/lib/web-server/types/web-server.interface';
import { IControllerInitializer } from '@/infrastructure/web-server/types/controller-initializer.interface';
import { rootModule } from '@/root.module';
import { Router } from 'h3';
import { IOpenApiBuilder } from '@/lib/open-api/types/open-api-builder.interface';

rootModule.init();

const apiControllerInitializer = rootModule.resolve<IControllerInitializer>(
  'apiControllerInitializer',
);
const webServer = rootModule.resolve<IWebServer>('webServer');
const db = rootModule.resolve<IAppDatabase>('db');
const openApiBuilder = rootModule.resolve<IOpenApiBuilder>('openApiBuilder');
const apiRouter = rootModule.resolve<Router>('apiRouter');

const usersController = rootModule.resolve('usersController');
const exampleController = rootModule.resolve('exampleController');

apiControllerInitializer.init(usersController, apiRouter, openApiBuilder);
apiControllerInitializer.init(exampleController, apiRouter, openApiBuilder);

webServer.start();

const shutdown = () => {
  Promise.allSettled([webServer.stop(), db.destroy()]).finally(() => process.exit(0));
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
