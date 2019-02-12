import {
  DefaultCrudRepository,
  HasManyThroughRepositoryFactory,
  repository
} from '@loopback/repository';
import { inject, Getter } from '@loopback/core';
import { MemoryDataSource, MongoDataSource } from '../datasources';
import { Patient, Physician } from '../models';
import { AppointmentRepository, PhysicianRepository } from '../repositories';

const { env } = process;
const datasource = env.DATASOURCE || 'memory';

export class PatientRepository extends DefaultCrudRepository<
  Patient,
  typeof Patient.prototype.id
> {
  public readonly physicians: HasManyThroughRepositoryFactory<
    Physician,
    typeof Patient.prototype.id
  >;

  constructor(
    @inject(`datasources.${datasource}`)
    dataSource: MemoryDataSource | MongoDataSource,
    @repository.getter('AppointmentRepository')
    getAppointmentRepository: Getter<AppointmentRepository>,
    @repository.getter('PhysicianRepository')
    getPhysicianRepository: Getter<PhysicianRepository>
  ) {
    super(Patient, dataSource);
    this.physicians = this.createHasManyThroughRepositoryFactoryFor(
      'physicians',
      getPhysicianRepository,
      getAppointmentRepository
    );
  }
}
