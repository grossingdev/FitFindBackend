import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  avatarUrl: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isClient: { type: Boolean, default: true },
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  speciality: { type: Number, default: -1 },
  facebook: { type: Schema.Types.Mixed },
  facebookId: { type: String },
  linkedin: { type: Schema.Types.Mixed },
  linkedinId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
