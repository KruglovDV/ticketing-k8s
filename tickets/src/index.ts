import mongoose from 'mongoose';

import { app } from './app';

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('jwt key not defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Mongo uri must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to mongodb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}

startup();