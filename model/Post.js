import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add a body']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Post', postSchema);
