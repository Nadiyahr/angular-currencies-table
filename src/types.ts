
export interface Currencies {
  effectiveDate: string;
  no: string;
  rates: Rates[];
  table: string
}

export interface Rates {
  id?: any;
  currency: string;
  code: string;
  mid: number;
}
