import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { OrderStatus, Order } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

it('Marks the order as cancelled', async () => {
  const ticket = Ticket.build({
    title: 'ticket',
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const user = signin();

  const res = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  
  await request(app)
    .delete(`/api/orders/${res.body.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);
  
  const order = await Order.findById(res.body.id);
  expect(order?.status).toEqual(OrderStatus.Cancelled);
});

it('emit a order cancelled event', async () => {
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
    .delete(`/api/orders/${res.body.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);
  
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});