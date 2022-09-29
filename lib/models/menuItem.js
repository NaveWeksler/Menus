import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

export default mongoose.models.MenuItem ||
  mongoose.model('MenuItem', menuItemSchema);
