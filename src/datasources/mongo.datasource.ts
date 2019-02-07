import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as mongoConfig from './mongo.datasource.json';
import * as pkg from '../../package.json';

const { env } = process;
const config = {
  ...mongoConfig,
  database:
    env.MONGO_DATABASE ||
    (mongoConfig.database.length ? mongoConfig.database : pkg.name),
  host: env.MONGO_HOST || mongoConfig.host,
  password: env.MONGO_PASSWORD || mongoConfig.password,
  port: Number(env.MONGO_PORT || mongoConfig.port),
  url: env.MONGO_URL || mongoConfig.url,
  user: env.MONGO_USER || mongoConfig.user
};

export class MongoDataSource extends juggler.DataSource {
  static dataSourceName = 'mongo';

  constructor(
    @inject('datasources.config.mongo', { optional: true })
    dsConfig: object = config
  ) {
    super(dsConfig);
  }
}
