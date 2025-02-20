import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
    title: string;
    description: string;
    data: Date;
    status: string;
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    data: { type: String, required: true },
    status: { type: String, required: true },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;