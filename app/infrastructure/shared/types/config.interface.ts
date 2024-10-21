export interface IConfig {
  nodeEnv: NodeEnv;
  webServer: {
    port: number;
  };
  jwt: {
    secret: string;
    accessToken: {
      expirationTime: string;
    };
    refreshToken: {
      expirationTime: string;
    };
  };
}

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}
