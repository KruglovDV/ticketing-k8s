import { Publisher, Subjects, OrderCancelledEvent } from '@ticketing-kr/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}