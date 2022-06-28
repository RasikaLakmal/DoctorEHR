import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button, Stack, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';

function DoctorRegister() {
    const [d_email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone_no, setPN] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigater = useNavigate();

    const handleCpRegister = () => {
        setError(null);
        setLoading(true);
        axios
            .post('http://localhost:3005/auth/register', { d_email: d_email, name: name, phone_no: phone_no, password: password })
            .then((response) => {
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);

                if (error.response.status === 400 || error.response.status === 401 || error.response.status === 409) {
                    setError(error.response.data);
                    setError('Fill all the detail');
                } else {
                    setError('Invalid input');
                }
            });
        navigater('/doctor_login');
        window.location.reload();
    };
    return (
        <div class="card" style={{ width: '75%', marginTop: '9%', marginLeft: '15%', backgroundColor: '#white' }}>
            <div class="card-body">
                <div>
                    <br />
                    <br />
                    <br />
                    <h1 style={{ textAlign: 'center' }}> Doctor Register </h1>
                    <br />
                    <br />

                    <Stack direction="horizontal" gap={5} className="d-flex justify-content-center">
                        <Form as={Row}>
                            <br />
                            {error && (
                                <div className="error" style={{ marginTop: '-10px', color: 'red' }}>
                                    {error}
                                </div>
                            )}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Col sm={{ span: 10, offset: 1 }}>
                                    <Form.Control type="email" placeholder="Email" value={d_email} onChange={(e) => setEmail(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Col sm={{ span: 10, offset: 1 }}>
                                    <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPhoneNo">
                                <Col sm={{ span: 10, offset: 1 }}>
                                    <Form.Control type="number" placeholder="Phone Number" value={phone_no} onChange={(e) => setPN(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Col sm={{ span: 10, offset: 1 }}>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Col sm={{ span: 5, offset: 7 }}>
                                    <Link to="/doctor_login">Already Registered?</Link> &nbsp;&nbsp;
                                    <Button type="submit" value={loading ? 'Loading...' : 'Register'} disabled={loading} onClick={handleCpRegister}>
                                        Register
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Stack>
                </div>
            </div>
        </div>
    );
}
export default DoctorRegister;
