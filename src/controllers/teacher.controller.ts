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
import { Teacher } from '../models';
import { TeacherRepository } from '../repositories';

export class TeacherController {
  constructor(
    @repository(TeacherRepository)
    public teacherRepository: TeacherRepository
  ) {}

  @post('/teachers', {
    responses: {
      '200': {
        description: 'Teacher model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Teacher } } }
      }
    }
  })
  async create(@requestBody() teacher: Teacher): Promise<Teacher> {
    return await this.teacherRepository.create(teacher);
  }

  @get('/teachers/count', {
    responses: {
      '200': {
        description: 'Teacher model count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Teacher)) where?: Where
  ): Promise<Count> {
    return await this.teacherRepository.count(where);
  }

  @get('/teachers', {
    responses: {
      '200': {
        description: 'Array of Teacher model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Teacher } }
          }
        }
      }
    }
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Teacher)) filter?: Filter
  ): Promise<Teacher[]> {
    return await this.teacherRepository.find(filter);
  }

  @patch('/teachers', {
    responses: {
      '200': {
        description: 'Teacher PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody() teacher: Teacher,
    @param.query.object('where', getWhereSchemaFor(Teacher)) where?: Where
  ): Promise<Count> {
    return await this.teacherRepository.updateAll(teacher, where);
  }

  @get('/teachers/{id}', {
    responses: {
      '200': {
        description: 'Teacher model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Teacher } } }
      }
    }
  })
  async findById(@param.path.string('id') id: string): Promise<Teacher> {
    return await this.teacherRepository.findById(id);
  }

  @patch('/teachers/{id}', {
    responses: {
      '204': {
        description: 'Teacher PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() teacher: Teacher
  ): Promise<void> {
    await this.teacherRepository.updateById(id, teacher);
  }

  @put('/teachers/{id}', {
    responses: {
      '204': {
        description: 'Teacher PUT success'
      }
    }
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() teacher: Teacher
  ): Promise<void> {
    await this.teacherRepository.replaceById(id, teacher);
  }

  @del('/teachers/{id}', {
    responses: {
      '204': {
        description: 'Teacher DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.teacherRepository.deleteById(id);
  }
}
