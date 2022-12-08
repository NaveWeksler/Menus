import mongoose from 'mongoose';

interface IMenu {
	owner: mongoose.Types.ObjectId;
	title: string;
	items: mongoose.Schema.Types.ObjectId[];
}

const menuSchema = new mongoose.Schema<IMenu>({
	owner: {
		// the user who owns this menu
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	items: {
		type: [{ type: mongoose.Types.ObjectId, ref: 'MenuItem' }],
		required: false,
		default: [],
	},
});

export default (mongoose.models.Menu as mongoose.Model<IMenu>) ||
	mongoose.model('Menu', menuSchema);
