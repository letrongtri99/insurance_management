import LeadDetailRepository from './index';
import LeadDetailCloud from './cloud';

test('calls getAppointment', () => {
  const leadDetailRepository = new LeadDetailRepository();

  const spyGetAppointment = jest.spyOn(LeadDetailCloud, 'getAppointment');

  const payload = {
    startDate: '09/20/2021',
    filter: 'test',
  };

  leadDetailRepository.getAppointment(payload);

  expect(spyGetAppointment).toHaveBeenCalledWith(payload);
});
