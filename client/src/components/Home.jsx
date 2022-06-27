import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';

function Home() {
    return (
        <div className="App">
            <div class="card" style={{ width: '75%', marginTop: '13%', marginLeft: '15%', backgroundColor: '#white' }}>
                <div class="card-body">
                   
                    <h3>Health Care</h3>
                    <br />
                    <br /> <br />
                    <br /> <br />
                    <br /> <br />
                    <br />
                    <Link to="/doctor_login">
                        {' '}
                        <Button variant="primary">Doctor Login</Button>
                    </Link>
                    <Link to="/doctor_register">
                        {' '}
                        <Button variant="warning">Doctor Register</Button>
                    </Link>
                    <br />
                    <br /> <br />
                    <br /> <br />
                    <br />
                </div>
            </div>
        </div>
    );
}
export default Home;
