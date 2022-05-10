import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('Fetches order', async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'ticket',
    price: 20
  })
  await ticket.save();

  const user = signin();

  const res = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  
  const res2 = await request(app)
    .get(`/api/orders/${res.body.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(res.body.id).toEqual(res2.body.id);
});

it('Returns and error if user not own the order', async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'ticket',
    price: 20
  })
  await ticket.save();

  const user = signin();

  const res = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  
  await request(app)
    .get(`/api/orders/${res.body.id}`)
    .set('Cookie', signin())
    .send()
    .expect(401);

});