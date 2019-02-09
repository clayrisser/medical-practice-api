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
import { Appointment } from '../models';
import { AppointmentRepository } from '../repositories';

export class AppointmentController {
  constructor(
    @repository(AppointmentRepository)
    public appointmentRepository: AppointmentRepository
  ) {}

  @post('/appointments', {
    responses: {
      '200': {
        description: 'Appointment model instance',
        content: {
          'application/json': { schema: { 'x-ts-type': Appointment } }
        }
      }
    }
  })
  async create(@requestBody() appointment: Appointment): Promise<Appointment> {
    return await this.appointmentRepository.create(appointment);
  }

  @get('/appointments/count', {
    responses: {
      '200': {
        description: 'Appointment model count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Appointment)) where?: Where
  ): Promise<Count> {
    return await this.appointmentRepository.count(where);
  }

  @get('/appointments', {
    responses: {
      '200': {
        description: 'Array of Appointment model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Appointment } }
          }
        }
      }
    }
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Appointment))
    filter?: Filter
  ): Promise<Appointment[]> {
    return await this.appointmentRepository.find(filter);
  }

  @patch('/appointments', {
    responses: {
      '200': {
        description: 'Appointment PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody() appointment: Appointment,
    @param.query.object('where', getWhereSchemaFor(Appointment)) where?: Where
  ): Promise<Count> {
    return await this.appointmentRepository.updateAll(appointment, where);
  }

  @get('/appointments/{id}', {
    responses: {
      '200': {
        description: 'Appointment model instance',
        content: {
          'application/json': { schema: { 'x-ts-type': Appointment } }
        }
      }
    }
  })
  async findById(@param.path.string('id') id: string): Promise<Appointment> {
    return await this.appointmentRepository.findById(id);
  }

  @patch('/appointments/{id}', {
    responses: {
      '204': {
        description: 'Appointment PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() appointment: Appointment
  ): Promise<void> {
    await this.appointmentRepository.updateById(id, appointment);
  }

  @put('/appointments/{id}', {
    responses: {
      '204': {
        description: 'Appointment PUT success'
      }
    }
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() appointment: Appointment
  ): Promise<void> {
    await this.appointmentRepository.replaceById(id, appointment);
  }

  @del('/appointments/{id}', {
    responses: {
      '204': {
        description: 'Appointment DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.appointmentRepository.deleteById(id);
  }
}
