import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody
} from '@loopback/rest';
import { ClassRoom } from '../models';
import { ClassRoomRepository } from '../repositories';

export class ClassRoomController {
  constructor(
    @repository(ClassRoomRepository)
    public classRoomRepository: ClassRoomRepository
  ) {}

  @post('/class-rooms', {
    responses: {
      '200': {
        description: 'ClassRoom model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ClassRoom } } }
      }
    }
  })
  async create(@requestBody() classRoom: ClassRoom): Promise<ClassRoom> {
    return await this.classRoomRepository.create(classRoom);
  }

  @get('/class-rooms/count', {
    responses: {
      '200': {
        description: 'ClassRoom model count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ClassRoom)) where?: Where
  ): Promise<Count> {
    return await this.classRoomRepository.count(where);
  }

  @get('/class-rooms', {
    responses: {
      '200': {
        description: 'Array of ClassRoom model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': ClassRoom } }
          }
        }
      }
    }
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ClassRoom)) filter?: Filter
  ): Promise<ClassRoom[]> {
    return await this.classRoomRepository.find(filter);
  }

  @patch('/class-rooms', {
    responses: {
      '200': {
        description: 'ClassRoom PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody() classRoom: ClassRoom,
    @param.query.object('where', getWhereSchemaFor(ClassRoom)) where?: Where
  ): Promise<Count> {
    return await this.classRoomRepository.updateAll(classRoom, where);
  }

  @get('/class-rooms/{id}', {
    responses: {
      '200': {
        description: 'ClassRoom model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ClassRoom } } }
      }
    }
  })
  async findById(@param.path.string('id') id: string): Promise<ClassRoom> {
    return await this.classRoomRepository.findById(id);
  }

  @patch('/class-rooms/{id}', {
    responses: {
      '204': {
        description: 'ClassRoom PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() classRoom: ClassRoom
  ): Promise<void> {
    await this.classRoomRepository.updateById(id, classRoom);
  }

  @put('/class-rooms/{id}', {
    responses: {
      '204': {
        description: 'ClassRoom PUT success'
      }
    }
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() classRoom: ClassRoom
  ): Promise<void> {
    await this.classRoomRepository.replaceById(id, classRoom);
  }

  @del('/class-rooms/{id}', {
    responses: {
      '204': {
        description: 'ClassRoom DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.classRoomRepository.deleteById(id);
  }
}
