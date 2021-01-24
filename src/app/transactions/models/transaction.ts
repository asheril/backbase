import { AmountCurrency } from './amountCurrency';

export interface Transaction {
  categoryCode: string;
  dates: {
    valueDate: number;
  };
  transaction: {
    amountCurrency: AmountCurrency;
    type: string;
    creditDebitIndicator: string;
  };
  merchant: {
    name: string;
    accountNumber: string;
  };
}
