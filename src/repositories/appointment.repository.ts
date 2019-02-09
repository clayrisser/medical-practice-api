import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { Appointment } from '../models';
import { MemoryDataSource, MongoDataSource } from '../datasources';

export class AppointmentRepository extends DefaultCrudRepository<
  Appointment,
  typeof Appointment.prototype.id
> {
  constructor(
    @inject('datasources.memory') dataSource: MemoryDataSource | MongoDataSource
  ) {
    super(Appointment, dataSource);
  }
}
