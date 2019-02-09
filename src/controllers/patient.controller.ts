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
import { Patient } from '../models';
import { PatientRepository } from '../repositories';

export class PatientController {
  constructor(
    @repository(PatientRepository)
    public patientRepository: PatientRepository
  ) {}

  @post('/patients', {
    responses: {
      '200': {
        description: 'Patient model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Patient } } }
      }
    }
  })
  async create(@requestBody() patient: Patient): Promise<Patient> {
    return await this.patientRepository.create(patient);
  }

  @get('/patients/count', {
    responses: {
      '200': {
        description: 'Patient model count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Patient)) where?: Where
  ): Promise<Count> {
    return await this.patientRepository.count(where);
  }

  @get('/patients', {
    responses: {
      '200': {
        description: 'Array of Patient model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Patient } }
          }
        }
      }
    }
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Patient)) filter?: Filter
  ): Promise<Patient[]> {
    return await this.patientRepository.find(filter);
  }

  @patch('/patients', {
    responses: {
      '200': {
        description: 'Patient PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody() patient: Patient,
    @param.query.object('where', getWhereSchemaFor(Patient)) where?: Where
  ): Promise<Count> {
    return await this.patientRepository.updateAll(patient, where);
  }

  @get('/patients/{id}', {
    responses: {
      '200': {
        description: 'Patient model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Patient } } }
      }
    }
  })
  async findById(@param.path.string('id') id: string): Promise<Patient> {
    return await this.patientRepository.findById(id);
  }

  @patch('/patients/{id}', {
    responses: {
      '204': {
        description: 'Patient PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() patient: Patient
  ): Promise<void> {
    await this.patientRepository.updateById(id, patient);
  }

  @put('/patients/{id}', {
    responses: {
      '204': {
        description: 'Patient PUT success'
      }
    }
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() patient: Patient
  ): Promise<void> {
    await this.patientRepository.replaceById(id, patient);
  }

  @del('/patients/{id}', {
    responses: {
      '204': {
        description: 'Patient DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.patientRepository.deleteById(id);
  }
}
