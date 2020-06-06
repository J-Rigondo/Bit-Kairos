import mongoose from 'mongoose';

const Order = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  currencyPair: String,
  price: Number,
  amount: Number,
  processedAmount: {
    type: Number,
    default: 0
  },
  sell: Boolean,
  status: {
    type: String,
    enum: ['waiting', 'partial', 'processed'],
    default: 'waiting'
  },
  data: {
    type: Date,
    default: new Date()
  },
  processedDate: {
    type: Date,
    default: null
  }
});

const model = mongoose.model('Order', Order);
export default model;
