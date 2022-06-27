import mongoose, { Schema } from 'mongoose';
import IPatientMedicalRecord from '../interfaces/PatientMedicalRecords';

const PatientMedicalRecordSchema: Schema = new Schema(
    {
    
        complaint: { type: String, required: true },
        blood_pressure: { type: Number, required: true },
        pulse: { type: Number, required: true },
        illness: { type: Array<string>, required: true },
        treatment: { type: Array<string>, required: true },
        weight: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPatientMedicalRecord>('PatientMedicalRecord', PatientMedicalRecordSchema);
