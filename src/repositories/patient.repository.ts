import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { MemoryDataSource, MongoDataSource } from '../datasources';
import { Patient } from '../models';

export class PatientRepository extends DefaultCrudRepository<
  Patient,
  typeof Patient.prototype.id
> {
  constructor(
    @inject('datasources.memory') dataSource: MemoryDataSource | MongoDataSource
  ) {
    super(Patient, dataSource);
  }
}
