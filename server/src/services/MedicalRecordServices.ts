import { ReportcreateReqDto,RecordGetRequestDto } from '../dto/record.dto';
import { RecordsRepository } from '../repositories/recordRepo';

export class RecordsService {
    constructor(public recordRepo: RecordsRepository) {}

    async createR(recordData: ReportcreateReqDto) {
        const record = await this.recordRepo.CreateRecord(recordData);

        return record;
    }

    
    async GetRecord(recordData: RecordGetRequestDto) {
        const patient = await this.recordRepo.GetRecord(recordData);

        return patient
    }
}
