export interface IProduct {
  id: string;
  image: string;
  price: number;
  name: string;
  description: string;
  options: {
    label: string;
    values: string[];
  };
}

export interface IOption {
  label: string;
  values: string[];
}
