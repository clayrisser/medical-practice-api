import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Patient, Physician } from '../models';

@model()
export class Appointment extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id?: string;

  @property({
    type: 'string'
  })
  name?: string;

  @belongsTo(() => Physician)
  physicianId: string;

  @belongsTo(() => Patient)
  patientId: string;

  constructor(data?: Partial<Appointment>) {
    super(data);
  }
}
