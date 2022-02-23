export interface IField {
  title: string;
  type: 'text' | 'select' | 'date';
  value: string | number | Date | null;
  isEditable?: boolean;
  name?: string;
  onChange?: (payload: any) => void;
}
