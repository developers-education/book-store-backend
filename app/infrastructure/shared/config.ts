import * as process from 'process';
import { IConfig, NodeEnv } from '@/infrastructure/shared/types/config.interface';

export const config: IConfig = {
  nodeEnv: (process.env.NODE_ENV ?? NodeEnv.DEVELOPMENT) as NodeEnv,
  webServer: {
    port: Number(process.env.WEB_SERVER_PORT),
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    accessToken: {
      expirationTime: '2h',
    },
    refreshToken: {
      expirationTime: '30d',
    },
  },
};
