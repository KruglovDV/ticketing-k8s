import { Publisher, Subjects, OrderCreatedEvent } from '@ticketing-kr/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
