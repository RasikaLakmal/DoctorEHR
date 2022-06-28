import { DoctorCreateRequestDto ,DoctorGetRequestDto} from '../dto/doctor.dto';
//import { DoctorLoginRequestDto } from '../dto/doctorLogin.dto';
import Doctor from '../models/Doctor';
import IDoctor from '../interfaces/Doctor';
export class DoctorRepository {
    public readonly db = Doctor;

    async CreateDoctor(doctorData: DoctorCreateRequestDto) {
        return this.db.create(doctorData);
    }

    // async loginDoctor(doctorData: DoctorLoginRequestDto) {
    //     return this.db.create(doctorData);
    // }

    async GetDoctor(patientData: DoctorGetRequestDto) {
        return await this.db.find({ d_email: patientData.d_email })
    }
}
