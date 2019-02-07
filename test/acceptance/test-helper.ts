import { Loopback4ClassApiApplication } from '../..';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client
} from '@loopback/testlab';

export async function setupApplication(): Promise<AppWithClient> {
  const app = new Loopback4ClassApiApplication({
    rest: givenHttpServerConfig()
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return { app, client };
}

export interface AppWithClient {
  app: Loopback4ClassApiApplication;
  client: Client;
}
