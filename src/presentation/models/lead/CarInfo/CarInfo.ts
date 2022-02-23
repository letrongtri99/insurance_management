export default interface CarInfo {
  year: string | number;
  brand: string;
  model: string;
  engineSize: number;
  transmission: string;
  dashCam: boolean;
  purpose: string;
  province: string;
  modification: boolean;
  licensePlate: string;
  noOfDoor?: string;
  cabType?: string;
}

export type carInfoField = {
  title: string;
  value: string;
};
