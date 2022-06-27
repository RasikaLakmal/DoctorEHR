import { Document } from 'mongoose';

export default interface IPatientProfile extends Document {
    phone_no: Number;
    first_name: string;
    last_name: string;
    dob: string;
    gender: string;
    records:Array<string>;
}