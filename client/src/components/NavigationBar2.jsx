import React, {  useState,useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { Link ,NavLink } from 'react-router-dom';
import { BsPersonCircle, BsHourglassSplit,  BsPeople } from 'react-icons/bs';
import axios from 'axios';

function NavigationBar2(props) {
    const [posts, setposts] = useState([]);
    const [requestError, setRequestError] = useState();
   const phn= props.phone_no
    const userToken = localStorage.getItem('ujsonwebtoken');

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
            .get('http://localhost:3005/auth/getName', {})
            .then((res) => {
                console.log(res);
                setposts(res.data.patient);
                console.log(res.data.patient);
            })
            .catch((err) => {
                console.log(err);
                setRequestError(err);
            });
    }, []);

    const logout = async () => {
        try {
            localStorage.removeItem('jsonwebtoken');
        } catch (error) {
            console.log(error);
        }
    };
const NavLinkStyles = ({isActive}) => {
    return{
        fontWeight: isActive? 'bold' : 'normal' ,
        textDecoration: isActive? 'none' : 'undrline',
        color: isActive ? '#fff' : '#545e6f',
    background: isActive ? '#7600dc' : '#f0f0f0',
    }
}

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light">
                <Container>
                    <Navbar.Collapse>
                        <Nav>
                            &nbsp;&nbsp;
                            <NavLink style={NavLinkStyles} to='/patient_details'>
                                <BsPeople /><br/> Patient 
                            </NavLink>
                            &nbsp;&nbsp;
                            <NavLink style={NavLinkStyles} to="/patient_historyr">
                                
                                <BsHourglassSplit /><br/> History
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Link className="btn btn-outline-secondary rounded " to="/" style={{ marginTop: '30px' }} onClick={() => logout()}>
                                {posts.map((post) => post.name)} <BsPersonCircle />
                            </Link>
                            <br />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavigationBar2;
