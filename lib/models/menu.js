import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    
});

export default mongoose.models.Menu || mongoose.model('Menu', MenuSchema);