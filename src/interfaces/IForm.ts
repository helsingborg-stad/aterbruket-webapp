export interface IFields {
  name: string;
  dataType?: string;
  fieldType: string | number;
  disabled: boolean;
  required?: boolean;
  title: string;
  placeholder?: string;
  option?: IOption[];
  swe?: string[] | undefined;
  eng?: string[] | undefined;
}

interface IOption {
  name: string;
  swe?: string[] | undefined;
  eng?: string[] | undefined;
}
