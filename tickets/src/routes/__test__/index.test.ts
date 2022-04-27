import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/ticket';

const createTicket = (title: string, price: number) => {
  return request(app)
  .post('/api/tickets')
  .set('Cookie', signin())
  .send({ title, price })
  .expect(201);
};

it('should return all tickets', async () => {
  await createTicket('test', 1);
  await createTicket('test2', 2);
  
  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});