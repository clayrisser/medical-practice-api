import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { MemoryDataSource, MongoDataSource } from '../datasources';
import { Teacher } from '../models';

const { env } = process;
const datasource = env.DATASOURCE || 'memory';

export class TeacherRepository extends DefaultCrudRepository<
  Teacher,
  typeof Teacher.prototype.id
> {
  constructor(
    @inject(`datasources.${datasource}`)
    dataSource: MemoryDataSource | MongoDataSource
  ) {
    super(Teacher, dataSource);
  }
}
