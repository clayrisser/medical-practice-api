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
import { Homework } from '../models';
import { HomeworkRepository } from '../repositories';

export class HomeworkController {
  constructor(
    @repository(HomeworkRepository)
    public homeworkRepository: HomeworkRepository
  ) {}

  @post('/homework', {
    responses: {
      '200': {
        description: 'Homework model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Homework } } }
      }
    }
  })
  async create(@requestBody() homework: Homework): Promise<Homework> {
    return await this.homeworkRepository.create(homework);
  }

  @get('/homework/count', {
    responses: {
      '200': {
        description: 'Homework model count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Homework)) where?: Where
  ): Promise<Count> {
    return await this.homeworkRepository.count(where);
  }

  @get('/homework', {
    responses: {
      '200': {
        description: 'Array of Homework model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Homework } }
          }
        }
      }
    }
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Homework)) filter?: Filter
  ): Promise<Homework[]> {
    return await this.homeworkRepository.find(filter);
  }

  @patch('/homework', {
    responses: {
      '200': {
        description: 'Homework PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody() homework: Homework,
    @param.query.object('where', getWhereSchemaFor(Homework)) where?: Where
  ): Promise<Count> {
    return await this.homeworkRepository.updateAll(homework, where);
  }

  @get('/homework/{id}', {
    responses: {
      '200': {
        description: 'Homework model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Homework } } }
      }
    }
  })
  async findById(@param.path.string('id') id: string): Promise<Homework> {
    return await this.homeworkRepository.findById(id);
  }

  @patch('/homework/{id}', {
    responses: {
      '204': {
        description: 'Homework PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() homework: Homework
  ): Promise<void> {
    await this.homeworkRepository.updateById(id, homework);
  }

  @put('/homework/{id}', {
    responses: {
      '204': {
        description: 'Homework PUT success'
      }
    }
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() homework: Homework
  ): Promise<void> {
    await this.homeworkRepository.replaceById(id, homework);
  }

  @del('/homework/{id}', {
    responses: {
      '204': {
        description: 'Homework DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.homeworkRepository.deleteById(id);
  }
}
