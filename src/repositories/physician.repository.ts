import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { MemoryDataSource, MongoDataSource } from '../datasources';
import { Physician } from '../models';

const { env } = process;
const datasource = env.DATASOURCE || 'memory';

export class PhysicianRepository extends DefaultCrudRepository<
  Physician,
  typeof Physician.prototype.id
> {
  constructor(
    @inject(`datasources.${datasource}`)
    dataSource: MemoryDataSource | MongoDataSource
  ) {
    super(Physician, dataSource);
  }
}
