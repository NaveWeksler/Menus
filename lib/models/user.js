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
  username: {type: String, required: true, trim: true},
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

  /* not required */
  sessionToken: {type: String},
  sessionTokenExpMs: {type: Number},
  
});

export default mongoose.models.User || mongoose.model('User', userSchema);
