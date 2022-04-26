import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('has a rout handler listening to /api/tickets for post request', async() => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});
  
  expect(response.status).not.toEqual(404);
});

it('can only be access if use is signed in', async() => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
});

it('returns a status other than 401 if the user is signed in', async() => {
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', signin())
  .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if invalid title was provided', async() => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title: '', price: 10 })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ price: 10 })
    .expect(400);
});

it('returns an error if invalid price was provided', async() => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title: 'test', price: -10 })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title: 'test' })
    .expect(400);
});

it('creates a ticket with valid parameters', async() => {
  const title = 'test';
  const price = 10;

  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title, price })
    .expect(201);
  
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(price);
});