/* eslint-disable camelcase */
export interface ICreatePackage {
  id?: string;
  name: string;
  package_type: string;
  start_date: string;
  expiration_date: string;
  insurance_company_id: number;
  car_insurance_type: string;
  oic_code: number;
  car_repair_type: string;
  modified_car_accepted: boolean;
  has_cctv_discount: boolean;
  car_age_min: number;
  car_age_max: number;
  sum_coverage_min: number;
  sum_coverage_max: number;
  deductible_amount: number;
  price: number;
  fire_theft_coverage: number;
  flood_coverage: number;
  liability_per_person_coverage: number;
  liability_property_coverage: number;
  liability_per_accident_coverage: number;
  personal_accident_coverage: number;
  personal_accident_coverage_no: number;
  medical_expenses_coverage: number;
  medical_expenses_coverage_no: number;
  bail_bond_coverage: number;
  source: string;
  provinces: [number];
  car_submodels: [number];
  active?: boolean;
  reuse_manual_package?: boolean;
  is_linkout?: boolean;
  is_fixed_premium?: boolean;
  fixedDriver?: number;
  firstDriverDOB?: string;
  secondDriverDOB?: string;
}

export interface ICollection {
  id: string | number;
  value: string | number;
  title: string;
}

export interface IInputProps {
  title?: string;
  name: string;
  placeholder?: string;
  type?: string;
  value?: string | number | Date;
  childs?: IInputProps[];
  disable?: boolean;
  options?: any[];
  column?: number;
}

export interface ISelectOptions {
  id: string | number | undefined;
  title: string;
  value: string | number;
}
