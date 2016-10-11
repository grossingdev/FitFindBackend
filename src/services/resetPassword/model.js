import mongoose, { Schema } from 'mongoose';

const resetPasswordSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
});

const resetPasswordModel = mongoose.model('resetPassword', resetPasswordSchema);

export default resetPasswordModel;
