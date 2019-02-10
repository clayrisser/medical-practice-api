import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { Appointment } from '../models';
import { MemoryDataSource, MongoDataSource } from '../datasources';

const { env } = process;
const datasource = env.DATASOURCE || 'memory';

export class AppointmentRepository extends DefaultCrudRepository<
  Appointment,
  typeof Appointment.prototype.id
> {
  constructor(
    @inject(`datasources.${datasource}`)
    dataSource: MemoryDataSource | MongoDataSource
  ) {
    super(Appointment, dataSource);
  }
}
