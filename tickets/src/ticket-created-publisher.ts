import { Publisher, Subjects, TicketCreatedEvent } from '@ticketing-kr/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}