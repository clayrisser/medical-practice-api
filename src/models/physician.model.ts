import { Entity, model, property, hasMany } from '@loopback/repository';
import { Appointment, Patient } from '../models';

@model()
export class Physician extends Entity {
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

  @hasMany(() => Patient, { through: () => Appointment })
  patients: Patient[];

  constructor(data?: Partial<Physician>) {
    super(data);
  }
}
