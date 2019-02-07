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
import { Student } from '../models';
import { StudentRepository } from '../repositories';

export class StudentController {
  constructor(
    @repository(StudentRepository)
    public studentRepository: StudentRepository
  ) {}

  @post('/students', {
    responses: {
      '200': {
        description: 'Student model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Student } } }
      }
    }
  })
  async create(@requestBody() student: Student): Promise<Student> {
    return await this.studentRepository.create(student);
  }

  @get('/students/count', {
    responses: {
      '200': {
        description: 'Student model count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Student)) where?: Where
  ): Promise<Count> {
    return await this.studentRepository.count(where);
  }

  @get('/students', {
    responses: {
      '200': {
        description: 'Array of Student model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Student } }
          }
        }
      }
    }
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Student)) filter?: Filter
  ): Promise<Student[]> {
    return await this.studentRepository.find(filter);
  }

  @patch('/students', {
    responses: {
      '200': {
        description: 'Student PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody() student: Student,
    @param.query.object('where', getWhereSchemaFor(Student)) where?: Where
  ): Promise<Count> {
    return await this.studentRepository.updateAll(student, where);
  }

  @get('/students/{id}', {
    responses: {
      '200': {
        description: 'Student model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Student } } }
      }
    }
  })
  async findById(@param.path.string('id') id: string): Promise<Student> {
    return await this.studentRepository.findById(id);
  }

  @patch('/students/{id}', {
    responses: {
      '204': {
        description: 'Student PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() student: Student
  ): Promise<void> {
    await this.studentRepository.updateById(id, student);
  }

  @put('/students/{id}', {
    responses: {
      '204': {
        description: 'Student PUT success'
      }
    }
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() student: Student
  ): Promise<void> {
    await this.studentRepository.replaceById(id, student);
  }

  @del('/students/{id}', {
    responses: {
      '204': {
        description: 'Student DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.studentRepository.deleteById(id);
  }
}
