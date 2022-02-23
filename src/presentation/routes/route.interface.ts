import { ComponentType } from 'react';

export interface IRoutes {
  id?: string;
  path: string;
  icon?: any;
  name?: string;
  component?: ComponentType;
  children?: IRoutes[] | null;
  layout?: ComponentType;
}

export interface IHeaderRoutes {
  id: number;
  path: string;
  icon: any;
  text: string;
  type?: string;
}
