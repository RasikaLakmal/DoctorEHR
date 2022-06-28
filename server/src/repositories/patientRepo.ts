import { PatientCreateRequestDto,PatientUpdateRequestDto,PatientGetRequestDto } from '../dto/patient.dto';
import Patient from '../models/PatientProfile';
import IPatientProfile from '../interfaces/PatientProfile';
//import { PatientUpdateRequestDto } from '../dto/patient.dto';
//import { PatientDeleteRequestDto } from '../dto/patientDelete.dto';
export class PatientRepository {
    public readonly db = Patient;

    async CreatePatient(patientData: PatientCreateRequestDto) {
        return this.db.create(patientData);
    }

    async UpdatePatientRecord(patientData: PatientUpdateRequestDto) {
        return await this.db.findByIdAndUpdate(patientData._id, { $push: { records: patientData.records } }, { upsert: true });
    }

    // async DeletePatientRecord(patientData: PatientDeleteRequestDto) {
    //     return await this.db.findByIdAndDelete(patientData._id);
    // }

     async GetPatientRecord(patientData: PatientGetRequestDto) {
        return await this.db.find({ phone_no: patientData.phone_no }).populate('records').exec()
    }
}
