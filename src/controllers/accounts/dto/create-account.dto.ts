export class CreateAccountDto {
  name: string;
  total: number;
  // TODO: Filter only 'CREDIT' || 'DEBIT'
  type: string;

  cutoffDay: number;
  daysPaymentLimit: number;
}
