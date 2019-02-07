import { Entity, model, property } from '@loopback/repository';

@model()
export class Student extends Entity {
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

  constructor(data?: Partial<Student>) {
    super(data);
  }
}
