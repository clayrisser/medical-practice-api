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
import { PhysicianRepository, PatientRepository } from '../repositories';

export class PatientPhysicianController {
  constructor(
    @repository(PhysicianRepository)
    public physicianRepository: PhysicianRepository,
    @repository(PatientRepository) public patientRepository: PatientRepository
  ) {}

  @post('/patients/{patientId}/physicians', {
    responses: {
      '200': {
        description: 'Physician model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Physician } } }
      }
    }
  })
  async create(
    @param.path.string('patientId') patientId: string,
    @requestBody() physician: Physician
  ): Promise<Physician> {
    return await this.patientRepository.physicians(patientId).create(physician);
  }

  @get('/patients/{patientId}/physicians/count', {
    responses: {
      '200': {
        description: 'Physician model count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.path.string('patientId') patientId: string,
    @param.query.object('where', getWhereSchemaFor(Physician)) where?: Where
  ): Promise<Count> {
    return {
      count: (await this.patientRepository
        .physicians(patientId)
        .find({ where })).length
    };
  }

  @get('/patients/{patientId}/physicians', {
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
    @param.path.string('patientId') patientId: string,
    @param.query.object('filter', getFilterSchemaFor(Physician)) filter?: Filter
  ): Promise<Physician[]> {
    return await this.patientRepository.physicians(patientId).find(filter);
  }

  // @patch('/physicians', {
  //   responses: {
  //     '200': {
  //       description: 'Physician PATCH success count',
  //       content: { 'application/json': { schema: CountSchema } }
  //     }
  //   }
  // })
  // async updateAll(
  //   @requestBody() physician: Physician,
  //   @param.query.object('where', getWhereSchemaFor(Physician)) where?: Where
  // ): Promise<Count> {
  //   return await this.physicianRepository.updateAll(physician, where);
  // }

  // @get('/physicians/{id}', {
  //   responses: {
  //     '200': {
  //       description: 'Physician model instance',
  //       content: { 'application/json': { schema: { 'x-ts-type': Physician } } }
  //     }
  //   }
  // })
  // async findById(@param.path.string('id') id: string): Promise<Physician> {
  //   return await this.physicianRepository.findById(id);
  // }

  // @patch('/physicians/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Physician PATCH success'
  //     }
  //   }
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody() physician: Physician
  // ): Promise<void> {
  //   await this.physicianRepository.updateById(id, physician);
  // }

  // @put('/physicians/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Physician PUT success'
  //     }
  //   }
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() physician: Physician
  // ): Promise<void> {
  //   await this.physicianRepository.replaceById(id, physician);
  // }

  // @del('/physicians/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Physician DELETE success'
  //     }
  //   }
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.physicianRepository.deleteById(id);
  // }
}
