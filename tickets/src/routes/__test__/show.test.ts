import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the ticket is not found', async () => {
  await request(app)
    .get('/api/tickets/aaa')
    .send()
    .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title: 'test', price: 10 })
    .expect(201);

  const ticketRes = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketRes.body.title).toEqual('test');
  expect(ticketRes.body.price).toEqual(10);
});
