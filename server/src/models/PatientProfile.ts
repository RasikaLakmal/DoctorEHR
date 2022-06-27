import mongoose, { Schema } from 'mongoose';
import IPatientProfile from '../interfaces/PatientProfile';

const PatientProfileSchema: Schema = new Schema(
    {
        phone_no: { type: Number, required: true, unique: true},
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        dob: { type: Date, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
        records: [{ type: Schema.Types.ObjectId, ref: 'Record' }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IPatientProfile>('PatientProfile', PatientProfileSchema);
