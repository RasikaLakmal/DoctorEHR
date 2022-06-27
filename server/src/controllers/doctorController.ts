import { DoctorCreateRequestDto } from '../dto/doctor.dto';
import { DoctorRepository } from '../repositories/doctorRepo';
import { DoctorService } from '../services/DoctorServices';
import { Request, Response,NextFunction } from 'express';
import bcryptjs from "bcryptjs";
import Doctor from '../models/Doctor';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

const doctorService: DoctorService = new DoctorService(new DoctorRepository());

exports.doctorRegister = async (req: Request, res: Response) => {
    const { d_email, name, phone_no, password } = req.body;
  bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(401).json({
                message: hashError.message,
                error: hashError
            });
        }

        const doc = new Doctor({
            _id: new mongoose.Types.ObjectId(),
            d_email,
            name,
            phone_no,
            password: hash
        });
        
    let doctorCreateRequestDto: DoctorCreateRequestDto = new DoctorCreateRequestDto(doc.d_email, doc.name, doc.phone_no, doc.password );

    const doctor =  doctorService.createDoctor(doctorCreateRequestDto);
return doctor
.then((user) => {return res.status(201).json({
    user
});})
   
})

};

exports.doctorLogin = async (req: Request, res: Response, next: NextFunction) => {

    let { d_email,name,phone_no, password } = req.body;
    
    Doctor.find({ d_email })
        .exec()
        .then((doctors) => {
            if (doctors.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
    
            bcryptjs.compare(password, doctors[0].password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Password Mismatch'
                    });
                } else if (result) {
                  const generateJWT = () => {
                      return jwt.sign(
                          {
                              cp_email: d_email,
                              name: name,
                              phone_no: phone_no
                          },
                          'SECRET',
                          { expiresIn: '1h' }
                      );
                  };
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: generateJWT()
                    });
                }
            });
        })
        .catch((error) => res.status(500).json({ error }));
}


