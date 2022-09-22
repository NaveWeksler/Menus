import mongoose from 'mongoose';
import './menuItem';

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }], // array of menu items
    required: true,
  },
});

export default mongoose.models.Menu || mongoose.model('Menu', menuSchema);
