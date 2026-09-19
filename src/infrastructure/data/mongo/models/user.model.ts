import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
    default: '',
  }
});

export const UserModel = mongoose.model('User', userSchema);