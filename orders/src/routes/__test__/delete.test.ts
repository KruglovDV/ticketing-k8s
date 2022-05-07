import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { OrderStatus, Order } from '../../models/order';

it('Marks the order as cancelled', async () => {
  const ticket = Ticket.build({ title: 'ticket', price: 20 })
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

it.todo('emit a order cancelled event');