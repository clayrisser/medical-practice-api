import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { MemoryDataSource, MongoDataSource } from '../datasources';
import { Physician } from '../models';

export class PhysicianRepository extends DefaultCrudRepository<
  Physician,
  typeof Physician.prototype.id
> {
  constructor(
    @inject('datasources.memory') dataSource: MemoryDataSource | MongoDataSource
  ) {
    super(Physician, dataSource);
  }
}
