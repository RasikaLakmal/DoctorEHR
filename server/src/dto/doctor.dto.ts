import IDoctor from '../interfaces/Doctor';
export class DoctorCreateRequestDto {
    constructor(
        public readonly d_email: string | undefined,
        public readonly name: string | undefined,
        public readonly phone_no: Number | undefined,
        public readonly password: string | undefined
    ) {}

    static from(body: Partial<DoctorCreateRequestDto>): DoctorCreateRequestDto {
        return new DoctorCreateRequestDto(body.d_email, body.name, body.phone_no, body.password);
    }

    static fromMany(doctors: IDoctor[]) {
        return doctors.map((doctor) => DoctorCreateRequestDto.from(doctor));
    }
}

export class DoctorGetRequestDto {
    constructor(
        public readonly d_email: string | undefined,
      //  public readonly _id: string | undefined,
       
    ) {}

    static from(body: Partial<DoctorCreateRequestDto>): DoctorCreateRequestDto {
        return new DoctorCreateRequestDto(body.d_email, body.name, body.phone_no, body.password);
    }


}
