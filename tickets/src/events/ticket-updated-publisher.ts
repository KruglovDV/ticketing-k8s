import { Publisher, Subjects, TicketUpdatedEvent } from '@ticketing-kr/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}