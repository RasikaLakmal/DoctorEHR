import mongoose, { Schema } from 'mongoose';
import IDoctor from '../interfaces/Doctor';

const DoctorSchema: Schema = new Schema(
    {
        d_email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        phone_no: { type: Number, unique: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
