import mongoose from 'mongoose';

import { app } from './app';

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('jwt key not defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('connected to mongodb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}

startup();