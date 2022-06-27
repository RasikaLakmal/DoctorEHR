import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button, Stack, Row, Col ,Input} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate ,Link,useLocation} from 'react-router-dom';
import NavigationBar2 from './NavigationBar2'
import { BiSearchAlt2 } from "react-icons/bi";



function PatientDetailsResult() {
    const [phone_no, setPN] = useState('');
    const [first_name, setFName] = useState('');
    const [last_name, setLName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDOB] = useState('');
     const [complaint, setComplaint] = useState('');
     const [illness, setIllness] = useState('');
     const [blood_pressure, setBloodPressure] = useState('');
     const [weight, setWeight] = useState('');
     const [treatment, setTreatment] = useState('');
     const [pulse, setPulse] = useState('');
     const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [requestError, setRequestError] = useState();
    const navigater = useNavigate();
    const location = useLocation();

    const userToken = localStorage.getItem('jsonwebtoken');

    console.log('userToken', userToken);

    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${userToken}`;
            console.log(config);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        axios
            .get(`http://localhost:3005/auth/get_patient/${location.state.phone_no}`)
            //${location.state.phone_no}
            .then((res) => {
                console.log(res);
                setPosts(res.data.patient);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
                setRequestError(err);
            });
    }, []);
    
    const handleAddIssues = () => {
        setError(null);
        setLoading(true);

        axios
            .post(`http://localhost:3005/auth/update_patient/${posts.map(post=>post._id)}`, {
                complaint:complaint,
                illness:illness,
                blood_pressure:blood_pressure,
                weight:weight,
                treatment:treatment,
                pulse:pulse,
                headers: { Authorization: `Bearer ${userToken}` }
            })
            .then((response1) => {
                console.log(response1);
                
                navigater(`/patient_history/${posts.map(post=>post.phone_no)}`,{state:{phone_no:posts.map(post=>post.phone_no)}});
               
            })
            .catch((error) => {
                setLoading(false);

                if (error.response1.status === 400 || error.response1.status === 401 || error.response1.status === 409) {
                    setError(error.response1.data);
                    setError('Fill all the details');
                } else {
                    setError('Invalid input');
                }
            });
    };


    return (
        <div>
            <NavigationBar2 />
            <br />
            <Row><Col><h3 style={{ textAlign: 'left', marginLeft: '30%', marginTop: '1%' }}>Patient Details </h3></Col><Col><h3 style={{ textAlign: 'left', marginLeft: '50%',marginRight: '20%', marginTop: '1%' }}><div class="input-group rounded">
  <input type="search" class="form-control rounded" placeholder="Search Patient" aria-label="Search" aria-describedby="search-addon" />
  <span class="input-group-text border-0" id="search-addon">
  <BiSearchAlt2/>
  </span>
</div></h3></Col></Row>

            
                    
                    <div class="card" style={{ width: '77%', marginTop: '1%', marginLeft: '14%',marginRight: '1%', backgroundColor: '#E5E4E2' }}>
                <div class="card-body">
                    <h4 style={{ textAlign: 'left', marginLeft: '5%', marginTop: '1%' }}>Personal Details </h4>
                        {' '}
                        <div>
                            <br />
                            {error && (
                                <div className="error" style={{ marginTop: '-10px', color: 'red' }}>
                                    {error}
                                </div>
                            )}

                            <Row style={{ width: '75%', marginLeft: '15%', marginRight: '15%', backgroundColor: '#white' }}>
                            <div>{posts.map(post=>(<>   <Row >  
                                    <Col>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Control type="number" value={post.phone_no} disabled/>
                                    </Form.Group>
                                    </Col><Col></Col>
                                    </Row>
                                    <Row>
                                    <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPhoneNo">
                                        <Form.Control type="text" value={post.first_name} disabled/>
                                    </Form.Group>
                                    </Col>
                                    <Col> <Form.Group className="mb-" controlId="formBasicPhoneNo">
                                        <Form.Control type="text" value={post.last_name} disabled/>
                                    </Form.Group>
                                   
                                    </Col>
                                    </Row>
                                    <Row><Col>
                                     <Form.Group className="mb-3" controlId="formBasicIssue">
                                        <Form.Control type="text" value={post.dob} disabled/>
                                    </Form.Group>
                                    </Col><Col style={{ width: '75%', marginLeft: '0%', backgroundColor: '#white' }}>
                                   
                                    
                                                                        <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Male"/>
                                    <label className="form-check-label" for="inlineRadio1">Male</label>
                                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Female"/>
                                    <label className="form-check-label" for="inlineRadio2">Female</label>
                                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Other" />
                                    <label className="form-check-label" for="inlineRadio3">Other</label>
                                    </div>
                                    </Col>


                                     </Row> </>))}  </div>
                               
                            </Row>
                        </div>
                        <br /></div></div>
                        _______________________________________________________________________________________________________________________________________________________________
                        <br />
                        <Form> <div><div><div> <h4 style={{ textAlign: 'left', marginLeft: '5%', marginTop: '1%' }}>Medical Record </h4>
                        <Row style={{ width: '75%', marginLeft: '15%', marginRight: '15%', backgroundColor: '#white' }}>
                            <Row><Col> <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Control  style={{ height: '95px' }} type="textarea" placeholder="Complaint" value={complaint} onChange={(e) => setComplaint(e.target.value)} />
                                </Form.Group></Col>
                                <Col><Row><Col><Form.Group className="mb-3" controlId="formBasicIssue">
                                    <Form.Control type="number" placeholder="Blood Pressure" value={blood_pressure} onChange={(e) => setBloodPressure(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-" controlId="formBasicPhoneNo">
                                    <Form.Control type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                                </Form.Group></Col> 
                                <Col> <Form.Group className="mb-" controlId="formBasicPhoneNo">
                                    <Form.Control type="number" placeholder="Pulse" value={pulse} onChange={(e) => setPulse(e.target.value)} />
                                </Form.Group></Col></Row>
                               </Col>
                                </Row>
                                <Row >
                                    <Col >  <Form.Group className="mb-3" controlId="formBasicPhoneNo">
                                    <Form.Control type="textarea" placeholder="Illness" value={illness} onChange={(e) => setIllness(e.target.value)} />
                                </Form.Group></Col><Col></Col>
                                    <Col >
                                    <Form.Group className="mb-" controlId="formBasicPhoneNo">
                                    <Form.Control type="textarea" placeholder="Treatment" value={treatment} onChange={(e) => setTreatment(e.target.value)} />
                                </Form.Group></Col><Col></Col></Row>
                            
                        </Row>
                        </div>
            </div><br/>
            <Form.Group className="mb-3">
                            <Col sm={{ span: 50, offset: 9 }}>
                                <Link to="/patient_details">
                                    <Button variant="light">Close</Button>
                                </Link>
                                &nbsp;&nbsp;
                                <Button className="button" type="submit" value={loading ? 'Loading...' : 'Sumbit'} disabled={loading} onClick={handleAddIssues}>
                                    Save
                                </Button>
                            </Col>
                        </Form.Group></div>
                    </Form>
                
        </div>
    );
}
export default PatientDetailsResult;
