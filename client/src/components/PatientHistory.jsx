import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button, Stack, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,useLocation ,Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { BiSearchAlt2 } from "react-icons/bi";

function PatientHistory() {
   const [posts, setposts] = useState([]);
   const [singlerecords, setrecords] = useState([]);
   const [error, setError] = useState(null);
   const [requestError, setRequestError] = useState();
   const navigate = useNavigate();
   const location = useLocation();

   const counterToken = localStorage.getItem('jsonwebtoken');

   axios.interceptors.request.use(
       (config) => {
           config.headers.authorization = `Bearer ${counterToken}`;
           console.log(config);
           return config;
       },
       (error) => {
           return Promise.reject(error);
       }
   );

 useEffect(() => {
     axios
         .get(`http://localhost:3005/auth/get_patient/12345`)
         //${location.state.phone_no}
         .then((res) => {
             console.log(res);
             setposts(res.data.patient);
             

             console.log(res.data)
             
         })
         .catch((err) => {
             console.log(err);
             setRequestError(err);
         });
 }, []);

 const sendMessage = (_id) => {
    axios
    .get(`http://localhost:3005/auth/get_record/${_id}`)
    //${location.state.phone_no}
    .then((resp) => {
        console.log(resp);
        setrecords(resp.data.record);
       

        console.log(resp.data)
       
    })
    .catch((err) => {
        console.log(err);
        setRequestError(err);
    });
}
  

//  const dc=(props)=>{
//     const {_id,treatment,complaint,illness,pulse,blood_pressure,weight} = props.records

//     return(
//         <Button key={_id} onClick={()=>props.clickHandler(_id,treatment,complaint,illness,pulse,blood_pressure,weight)}>CreatedAt</Button>
        
//     )
//  }
    return (
       
        <div>
        <NavigationBar />
        <br />
        <Row><Col><h3 style={{ textAlign: 'left', marginLeft: '30%', marginTop: '1%' }}>Patient History </h3></Col><Col><h3 style={{ textAlign: 'left', marginLeft: '50%',marginRight: '20%', marginTop: '1%' }}><div class="input-group rounded">
<input type="search" class="form-control rounded" placeholder="Search Patient" aria-label="Search" aria-describedby="search-addon" />
<span class="input-group-text border-0" id="search-addon">
<BiSearchAlt2/>
</span>
</div></h3></Col></Row><div> {posts.map(post=>(<>    

        
                
                <div class="card" style={{ width: '77%', marginTop: '1%', marginLeft: '14%',marginRight: '1%', backgroundColor: '#E5E4E2' }}>
            <div class="card-body">
                <h4 style={{ textAlign: 'left', marginLeft: '5%', marginTop: '1%' }}> {post.first_name} {post.last_name}  |age|{post.phone_no}| {post.gender} </h4>
                    {' '}
                    <div><Row>
                <Col sm={4} >{post.records.map(record => 
                     <li><a href="#" onClick={()=>sendMessage(record._id)}> 
                       {record.updatedAt}<br/>
                    </a></li>)}
                </Col>
                <Col  sm={8}> 
                    <div class="card" style={{ width: '100%', marginTop: '1%', marginLeft: '0%',marginRight: '1%', backgroundColor: '#white' }}>
                            rtgfg
                    </div>
                </Col>
            </Row>
                        <br />
                       

                        <Row style={{ width: '75%', marginLeft: '15%', marginRight: '15%', backgroundColor: '#white' }}>
                     
                       
                    </Row>
                    </div>
        </div><br/>
     
       
    </div>  </>))} 
   
        </div> <div>{singlerecords.map(srecord=>(<> 
        {srecord._id}{srecord.blood_pressure}

        </>))}</div> </div> 
      )
}
export default PatientHistory;
