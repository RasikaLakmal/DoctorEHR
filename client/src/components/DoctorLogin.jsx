import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button, Stack, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';

function DoctorLogin() {
    const [d_email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigater = useNavigate();

    const handleCpLogin = () => {
        setError(null);
        setLoading(true);
        axios
            .post('http://localhost:3005/auth/login', {
                d_email: d_email,
                password: password
            })
            .then((response) => {
                setLoading(false);
                localStorage.clear();
                localStorage.removeItem('jsonwebtoken');
                localStorage.setItem('jsonwebtoken', response.data.token);
                const counterToken = localStorage.getItem('jsonwebtoken');
                console.log('counterToken', counterToken);
                navigater('/patient_details');
                window.location.reload();
            })
            .catch((error) => {
                setLoading(false);
                if (error.response.status === 400 || error.response.status === 401 || error.response.status === 409) {
                    setError(error.response.data.message);
                    setError('Please enter both of  user name and password');
                } else {
                    setError('Incorrect user name or password');
                }
            });
    };
    
    return (
        <div class="card" style={{ width: '75%', marginTop: '9%', marginLeft: '15%', backgroundColor: '#white' }}>
            <div class="card-body">
                <div>
                    <br />
                    <br />
                    <br />
                    <h1 style={{ textAlign: 'center' }}> Doctor Login </h1>
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
                                    <Form.Control type="email" placeholder="User Name" value={d_email} onChange={(e) => setUsername(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Col sm={{ span: 10, offset: 1 }}>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Col sm={{ span: 5, offset: 7 }}>
                                    <Link to="/doctor_register">Not Registered Yet?</Link> &nbsp;&nbsp;
                                    <Button type="submit" value={loading ? 'Loading...' : 'Login'} disabled={loading} onClick={handleCpLogin}>
                                        Login
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
export default DoctorLogin;
