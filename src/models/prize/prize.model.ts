export interface Prize {
  id: string;
  name: string;
  description: string;
  points: number;
  disabled: boolean;
  ally: string;
  icon: string;
  availableCoupons: number;
}
