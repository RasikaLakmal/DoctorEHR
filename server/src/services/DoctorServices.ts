import { DoctorCreateRequestDto ,DoctorGetRequestDto} from '../dto/doctor.dto';
import { DoctorRepository } from '../repositories/doctorRepo';
//import { DoctorLoginRequestDto } from '../dto/doctorLogin.dto';

export class DoctorService {
    constructor(public doctorRepo: DoctorRepository) {}

    async createDoctor(doctorData: DoctorCreateRequestDto) {
        const doctor = await this.doctorRepo.CreateDoctor(doctorData);

        return DoctorCreateRequestDto.from(doctor);
    }

    // async loginDoctor(doctorData: DoctorLoginRequestDto) {
    //     const doctor = await this.doctorRepo.loginDoctor(doctorData);

    //     return DoctorLoginRequestDto.from(doctor);
    // }

    async GetDoctor(patientData: DoctorGetRequestDto) {
        const doctor = await this.doctorRepo.GetDoctor(patientData);

        return doctor;
    }
}
