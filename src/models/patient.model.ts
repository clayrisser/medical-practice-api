import { Entity, model, property, hasMany } from '@loopback/repository';
import { Appointment, Physician } from '../models';

@model()
export class Patient extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id?: string;

  @property({
    type: 'string',
    required: true
  })
  name: string;

  @hasMany(() => Physician, { through: () => Appointment })
  physicians: Physician[];

  constructor(data?: Partial<Patient>) {
    super(data);
  }
}
