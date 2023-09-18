import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, FormGroup, Label } from 'reactstrap';
import './Login.css';
import { BASE_URL } from '../Config/helper';
import HelmetComponent from '../Config/HelmetComponent';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const API_BASE = BASE_URL;

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true); // Set isLoading to true when login begins
      const response = await axios.post(`${API_BASE}/login`, { email, password });
      console.log(response);
      const token = response.data.token;
      localStorage.setItem('token', token);

      toast.success('Login Successful');
      navigate('/todo');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
        toast.error(error);
      } else {
        setError('An error occurred during login');
          toast.error(error.message);
      }
    } finally {
      setIsLoading(false); // Set isLoading to false when login is complete (success or failure)
    }
  };

  return (
    <div className="login-container">
      <HelmetComponent pageTitle="Login" />
      <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col md="4" className="mx-auto">
            <div className="signup-form p-4">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <i className="bi bi-person-circle" style={{ fontSize: '74px', width: '60px', height: '60px', color: 'grey' }}></i>
              </div>
              <h2 className='Login_head'>Log In</h2>

              <FormGroup>
                <Label for="email" className='inputsFieldName' >Email</Label>
                <br />
                <input type="email" id="email" className='dark' value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="password" className='inputsFieldName' >Password</Label>
                <br />
                <input type="password" id="password" className='dark' value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormGroup>

              <center>
                <button
                  className={`btn btn-outline-light ${isLoading ? 'disabled' : ''}`}
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </>
                  ) : (
                    'Log in'
                  )}
                </button>
                <p className='error_part'>{error ? <p>verify your email and password</p> : ''} </p>
              </center>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
