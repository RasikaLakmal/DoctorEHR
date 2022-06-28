import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorLogin from './components/DoctorLogin';
import DoctorRegister from './components/DoctorRegister';
import PatientDetails from './components/PatientDetails';
import PatientHistory from './components/PatientHistory';
import PatientDetailsResult from './components/PatientDetailsResult';
import PatientHistoryNav from './components/PatientHistoryNav';
import Home from './components/Home.jsx';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/doctor_register" element={<DoctorRegister />} />
                    <Route path="/doctor_login" element={<DoctorLogin />} />
                    <Route path="/patient_details" element={<PatientDetails />} />
                    <Route path="/patient_detailsr/:phone_no" element={<PatientDetailsResult />} />
                    <Route path="/patient_history/:phone_no" element={<PatientHistory />} />
                    <Route path="/patient_historyr" element={<PatientHistoryNav />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
