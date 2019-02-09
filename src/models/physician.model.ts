import { Entity, model, property } from '@loopback/repository';

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

  constructor(data?: Partial<Physician>) {
    super(data);
  }
}
