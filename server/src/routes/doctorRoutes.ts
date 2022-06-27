import { Router } from "express";
import authMiddleware from '../middleware/authMiddleware'

const doctorController = require('../controllers/doctorController');
//const patientDetailsController = require('../controllers/patientDetailsController');
const patientController = require('../controllers/patientController');

const router = Router();

//doctor auth

router.post("/register", doctorController.doctorRegister);
router.post('/login', doctorController.doctorLogin);
//router.get('/getalld', authMiddleware, doctorLoginController.readAllDoctors);

//CRUD patient

router.post('/patientdetails', patientController.patient);
router.post('/update_patient/:patientId', patientController.addrecord);
router.get('/get_patient/:patientId', patientController.getPatient);
router.get('/get_record/:_id', patientController.getRecord);
// router.post('/illnessdetails',authMiddleware, patientDetailsController.addIllnessDetails);
// router.patch('/update/:_id',  patientDetailsController.updatePatient);
// router.delete('/delete/:_id', patientDetailsController.deletePatient);
// router.get('/get/:patientPhone_no', patientDetailsController.findPatient);
router.get('/getall', patientController.readAllMedicals);

//router.post('/test', doctorLoginController.testFunc);
export default router;
