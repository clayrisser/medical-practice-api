import { Entity, model, property } from '@loopback/repository';

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

  constructor(data?: Partial<Patient>) {
    super(data);
  }
}
