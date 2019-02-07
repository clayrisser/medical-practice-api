import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { ClassRoom } from '../models';
import { MemoryDataSource, MongoDataSource } from '../datasources';

const { env } = process;
const datasource = env.DATASOURCE || 'memory';

export class ClassRoomRepository extends DefaultCrudRepository<
  ClassRoom,
  typeof ClassRoom.prototype.id
> {
  constructor(
    @inject(`datasources.${datasource}`)
    dataSource: MemoryDataSource | MongoDataSource
  ) {
    super(ClassRoom, dataSource);
  }
}
