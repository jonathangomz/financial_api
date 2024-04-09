export class CreateMovementDto {
  type:number;
  tag: number;

  date: Date;
  place: string;
  title: string;
  description: string;
  amount: number;
  online: boolean;

  months: number;
  deferredMovementId: string;
}
