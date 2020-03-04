import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('db connected');
});

db.on('error', () => {
  console.log('db error');
});
