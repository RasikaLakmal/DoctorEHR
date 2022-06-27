import { Document } from 'mongoose';

export default interface IDoctor extends Document {
    d_email: string;
    name: string;
    phone_no: number;
    password: string;
}
