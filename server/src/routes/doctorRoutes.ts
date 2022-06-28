import { Router } from "express";
import authMiddleware from '../middleware/authMiddleware'


const doctorController = require('../controllers/doctorController');
//const patientDetailsController = require('../controllers/patientDetailsController');
const patientController = require('../controllers/patientController');

const router = Router();

//doctor auth

router.post("/register", doctorController.doctorRegister);
router.post('/login', doctorController.doctorLogin);
router.get('/getName',authMiddleware, doctorController.getName );
//router.get('/getalld', authMiddleware, doctorLoginController.readAllDoctors);

//CRUD patient

router.post('/patientdetails',authMiddleware, patientController.patient);
router.post('/update_patient/:patientId',authMiddleware, patientController.addrecord);
router.get('/get_patient/:patientId', authMiddleware,patientController.getPatient);
router.get('/get_record/:_id',authMiddleware, patientController.getRecord);
// router.post('/illnessdetails',authMiddleware, patientDetailsController.addIllnessDetails);
// router.patch('/update/:_id',  patientDetailsController.updatePatient);
// router.delete('/delete/:_id', patientDetailsController.deletePatient);
// router.get('/get/:patientPhone_no', patientDetailsController.findPatient);
router.get('/getall',authMiddleware, patientController.readAllMedicals);

//router.post('/test', doctorLoginController.testFunc);
export default router;
