import { Entity, model, property } from '@loopback/repository';

@model()
export class ClassRoom extends Entity {
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

  constructor(data?: Partial<ClassRoom>) {
    super(data);
  }
}
