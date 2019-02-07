import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { MemoryDataSource, MongoDataSource } from '../datasources';
import { Student } from '../models';

const { env } = process;
const datasource = env.DATASOURCE || 'memory';

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype.id
> {
  constructor(
    @inject(`datasources.${datasource}`)
    dataSource: MemoryDataSource | MongoDataSource
  ) {
    super(Student, dataSource);
  }
}
