import { PatientCreateRequestDto,PatientGetRequestDto,PatientUpdateRequestDto } from '../dto/patient.dto';
import { PatientRepository } from '../repositories/patientRepo';
import { PatientService } from '../services/PatientServices';
import { RecordsService } from '../services/MedicalRecordServices';
import { Request, Response,NextFunction } from 'express';
import { RecordsRepository } from '../repositories/recordRepo';
import { ReportcreateReqDto,RecordGetRequestDto } from '../dto/record.dto';
import PatientMedicalRecords from '../models/PatientMedicalRecords';

const patientService: PatientService = new PatientService(new PatientRepository());
const recordsService: RecordsService = new RecordsService(new RecordsRepository());


exports.patient = async (req: Request, res: Response) => {
        const { first_name, last_name, phone_no, dob, gender, complaint, blood_pressure, pulse, weight, illness, treatment } = req.body;

        let rcreateReqDto: ReportcreateReqDto = new ReportcreateReqDto(treatment, complaint, illness, pulse, blood_pressure, weight);
        const record = await recordsService.createR(rcreateReqDto);

        let patientCreateRequestDto: PatientCreateRequestDto = new PatientCreateRequestDto(first_name, last_name, phone_no, dob, gender, record._id);

        const patient = await patientService.createPatient(patientCreateRequestDto);

        res.status(201).json({
        patient,
        record
    });
};


exports.addrecord = async (req: Request, res: Response) => {
        const { complaint, blood_pressure, pulse, weight, illness, treatment } = req.body;

        let rcreateReqDto: ReportcreateReqDto = new ReportcreateReqDto(treatment, complaint, illness, pulse, blood_pressure, weight);
        const record = await recordsService.createR(rcreateReqDto);

        const patientId= req.params.patientId

        let patientUpdateRequestDto: PatientUpdateRequestDto = new PatientUpdateRequestDto(patientId, record._id);

        const patient1 = await patientService.UpdatePatientRecord(patientUpdateRequestDto);

        res.status(201).json({
        patient1,
            record
        });
};

exports.readAllMedicals = (req: Request, res: Response, next: NextFunction) => {
        return PatientMedicalRecords.find()
        .then((patients) => res.status(200).json({ patients }))
        .catch((error) => res.status(500).json({ error }));
};

exports.getPatient = async (req: Request, res: Response) => {

        const patientId= req.params.patientId

        let patientGetRequestDto: PatientGetRequestDto = new PatientGetRequestDto(patientId);

        const patient = await patientService.GetPatientRecord(patientGetRequestDto);
        console.log(patient)
        res.status(201).json({
        patient
    });
};

exports.getRecord = async (req: Request, res: Response) => {

        const recordId= req.params._id

        let recordGetRequestDto: RecordGetRequestDto = new RecordGetRequestDto(recordId);

        const record = await recordsService.GetRecord(recordGetRequestDto);
        console.log(record)
        res.status(201).json({
        record
    });
};


