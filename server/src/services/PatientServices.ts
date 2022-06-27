import { PatientCreateRequestDto ,PatientGetRequestDto,PatientUpdateRequestDto} from '../dto/patient.dto';
import { PatientRepository } from '../repositories/patientRepo';
//import { PatientUpdateRequestDto } from '../dto/patient.dto';
//import { PatientDeleteRequestDto } from '../dto/patientDelete.dto';

export class PatientService {
    constructor(public patientRepo: PatientRepository) {}

    async createPatient(patientData: PatientCreateRequestDto) {
        const patient = await this.patientRepo.CreatePatient(patientData);

        return PatientCreateRequestDto.from(patient);
    }

    async UpdatePatientRecord(patientData: PatientUpdateRequestDto) {
        const patient = await this.patientRepo.UpdatePatientRecord(patientData);

        return patient;
    }

    // async deletePatient(patientData: PatientDeleteRequestDto) {
    //      const patient = await this.patientRepo.DeletePatientRecord(patientData);

    //      return patient;
    // }

    async GetPatientRecord(patientData: PatientGetRequestDto) {
        const patient = await this.patientRepo.GetPatientRecord(patientData);

        return patient;
    }
}
