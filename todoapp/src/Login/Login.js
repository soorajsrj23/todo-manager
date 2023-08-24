import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { toast } from 'react-toastify';
import { Container, Row, Col, FormGroup, Label } from 'reactstrap';
import './Login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });
      console.log(response);
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Redirect to profile page
  //    toast.success("Login Successfull");
     navigate('/todo');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
    //    toast.error(error);
      } else {
        setError('An error occurred during login');
      //  toast.error(error.message);
      }
    }
  };

  return (
    <div className="login-container">
   <Container className="h-100">
    <Row className="h-100 justify-content-center align-items-center">
      <Col md="4" className="mx-auto">
        <div className="signup-form p-4">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <i className="bi bi-person-circle" style={{ fontSize: '74px', width: '60px', height: '60px', color: 'grey' }}></i>
        </div>
          <h2 className='Login_head'>Log In</h2>
          
          <FormGroup>
          
            <Label for="email"className='inputsFieldName' >Email</Label>
            <br/>
            <input type="email" id="email"  className='dark' value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password"  className='inputsFieldName' >Password</Label>
            <br/>
            <input type="password" id="password" className='dark'  value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          
          <center>
            <button type="button" class="btn btn-outline-light" onClick={handleLogin}>Log In</button>
            <p className='error_part'>{error?<p>verify your email and password</p>:''} </p>
          </center>
        </div>
      </Col>
    </Row>
   
  </Container>
  
  </div>
  );
};

export default Login;
