import { canDownload } from '../../../presentation/pages/leads/ImportLeadPage/ImportLeadPageHelper';

const fakeRole = 'roles/admin';
test('Check user could be download data', () => {
  expect(canDownload(fakeRole)).toEqual(true);
});
