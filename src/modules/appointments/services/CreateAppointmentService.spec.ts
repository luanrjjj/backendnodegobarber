import AppError from '../../../shared/errors/AppError';
import 'reflect-metadata'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

import CreateAppointmentService from './CreateAppointmentService';
import  FakeNotificationsRepository from '../../notifications/repositories/INotificationsRepositories'
import FakeCacheProvider from '../../../shared/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeCacheProvider:FakeCacheProvider;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        
        createAppointment = new CreateAppointmentService(fakeAppointmentsRepository,fakeNotificationsRepository,fakeCacheProvider)

    });


    it('should be able to create a new appointment', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {

            return new Date(2020, 4, 10, 12).getTime()
        })


        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'user-id',
            user_id: 'provider-id'

        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('user-id');
    })

    it('should not be able to create a new appointment on same time', async () => {

        const appointmentDate = new Date(2021, 4, 10, 11);


        await expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: 'provider-id',
            user_id: 'user-id'
        })).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 10, 11),
                provider_id: 'provider-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });


    it('should not be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 13).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 10, 13),
                provider_id: 'user-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });



    it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 13).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 11, 7),
                provider_id: 'user-id',
                user_id: 'provider-id',
            }),
        ).rejects.toBeInstanceOf(AppError);


        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 11, 18),
                provider_id: 'user-id',
                user_id: 'provider-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });


})