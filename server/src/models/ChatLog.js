import mongoose from 'mongoose';

const chatLogSchema = new mongoose.Schema({
  sender: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
  isGroup: Boolean,
  groupName: String,
});

export default mongoose.model('ChatLog', chatLogSchema);
