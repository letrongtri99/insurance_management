import { IHeaderRoutes } from 'presentation/routes/route.interface';

const headerRoutes: IHeaderRoutes[] = [
  {
    id: 1,
    icon: '',
    path: '/lead/my-leads',
    text: 'My Leads',
  },
  {
    id: 2,
    icon: null,
    path: '#',
    type: 'addLead',
    text: 'Add Lead',
  },
  {
    id: 3,
    icon: '',
    path: '#',
    type: 'appointment',
    text: 'My Appointment',
  },
];

export const emptyHeaderRoutes: IHeaderRoutes[] = [];

export const rightHeaderRoutes: IHeaderRoutes[] = [];

export default headerRoutes;
