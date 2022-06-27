import { ReportcreateReqDto,RecordGetRequestDto } from '../dto/record.dto';
import PatientMedicalRecord from '../models/PatientMedicalRecords';

export class RecordsRepository {
    public readonly db = PatientMedicalRecord;

    async CreateRecord(recordData: ReportcreateReqDto) {
        return this.db.create(recordData);
    }

    async GetRecord(recordData: RecordGetRequestDto) {
        return await this.db.findById(recordData)
    }
}
