import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { app } from '../app';

declare global {
  var signin: () => string[];
}

let mongo: MongoMemoryServer;

beforeAll(async() => {
  process.env.JWT_KEY = 'asdf';
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async() => {
  const collections = await mongoose.connection.db.collections();
  collections.forEach(collection => collection.deleteMany({}));
});

afterAll(async () => {
  await mongo.stop();
  mongoose.connection.close();
});

global.signin = () => {
  const payload = {
    id: 'someId',
    email: 'test@test.com'
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  
  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};