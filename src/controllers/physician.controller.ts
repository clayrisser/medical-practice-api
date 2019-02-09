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
import { Physician } from '../models';
import { PhysicianRepository } from '../repositories';

export class PhysicianController {
  constructor(
    @repository(PhysicianRepository)
    public physicianRepository: PhysicianRepository
  ) {}

  @post('/physicians', {
    responses: {
      '200': {
        description: 'Physician model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Physician } } }
      }
    }
  })
  async create(@requestBody() physician: Physician): Promise<Physician> {
    return await this.physicianRepository.create(physician);
  }

  @get('/physicians/count', {
    responses: {
      '200': {
        description: 'Physician model count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Physician)) where?: Where
  ): Promise<Count> {
    return await this.physicianRepository.count(where);
  }

  @get('/physicians', {
    responses: {
      '200': {
        description: 'Array of Physician model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Physician } }
          }
        }
      }
    }
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Physician)) filter?: Filter
  ): Promise<Physician[]> {
    return await this.physicianRepository.find(filter);
  }

  @patch('/physicians', {
    responses: {
      '200': {
        description: 'Physician PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody() physician: Physician,
    @param.query.object('where', getWhereSchemaFor(Physician)) where?: Where
  ): Promise<Count> {
    return await this.physicianRepository.updateAll(physician, where);
  }

  @get('/physicians/{id}', {
    responses: {
      '200': {
        description: 'Physician model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Physician } } }
      }
    }
  })
  async findById(@param.path.string('id') id: string): Promise<Physician> {
    return await this.physicianRepository.findById(id);
  }

  @patch('/physicians/{id}', {
    responses: {
      '204': {
        description: 'Physician PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() physician: Physician
  ): Promise<void> {
    await this.physicianRepository.updateById(id, physician);
  }

  @put('/physicians/{id}', {
    responses: {
      '204': {
        description: 'Physician PUT success'
      }
    }
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() physician: Physician
  ): Promise<void> {
    await this.physicianRepository.replaceById(id, physician);
  }

  @del('/physicians/{id}', {
    responses: {
      '204': {
        description: 'Physician DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.physicianRepository.deleteById(id);
  }
}
