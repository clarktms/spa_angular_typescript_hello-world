export interface Transaction {
  transactionId: string;
  description: string;
  amount: number;
  credit: boolean;
  active: boolean;
  date: Date;
  category: string;
}
