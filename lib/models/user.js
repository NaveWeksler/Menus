import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  permissions: { // which calls the user can make. 0 for admin 1 for menu owner
    type: Number,
    required: true,
  },
  userType: { // who is the user. 0 for admin, 1 for menu owner
    type: Number,
    required: true,
  },

  sessionToken: String,
  sessionTokenExpMs: Number,

  name: {
    type: String,
    required: true,
    trim: true,
  },

  familyName: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },
  
});

export default mongoose.models.User || mongoose.model('User', userSchema);
