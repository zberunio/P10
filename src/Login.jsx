import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { API_ENDPOINT } from './Api';

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    // Verify if User is already logged in
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = JSON.parse(token);
                    console.log('User token from localStorage:', response);  // Debugging the token
                    setUser(response?.data);
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error("Invalid token or error in localStorage", error);
            }
        };

        fetchUser();
    }, [navigate]);

    // Login state management
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
                username,
                password,
            });

            console.log('Login response:', response.data); // Debugging the response
            localStorage.setItem("token", JSON.stringify(response.data));
            setError('');
            navigate("/dashboard");
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid username or password');
        }
    };

    return (
        <>
            { }
            <Navbar style={{ backgroundColor: '#FF6600' }} variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                      
                    </Navbar.Brand>
                </Container>
            </Navbar>

            {/* Black body background */}
            <div style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', paddingTop: '5%' }}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <div className="login-form">
                                <div className="container">
                                    <center>
                                    <h2 style={{ fontSize: '30px' }}>Enrollment System</h2>
                                    </center>
                                    <h2 style={{ fontSize: '18px' }}>Please Log In to proceed</h2>
                                    &nbsp;
                                    <div className="card" style={{ backgroundColor: '#222', color: '#fff' }}>
                                        <div className="card-body login-card-body">
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group controlId="formUsername">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control
                                                        className="form-control-sm rounded-pill"
                                                        type="text"
                                                        placeholder="Enter Username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        required
                                                        style={{
                                                            backgroundColor: '#333',
                                                            color: '#fff',
                                                            border: '1px solid #FF6600',
                                                            borderRadius: '25px',
                                                            paddingLeft: '15px',
                                                        }}
                                                    />
                                                </Form.Group>
                                                <br />

                                                <Form.Group controlId="formPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        className="form-control-sm rounded-pill"
                                                        type="password"
                                                        placeholder="Enter Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                        style={{
                                                            backgroundColor: '#333',
                                                            color: '#fff',
                                                            border: '1px solid #FF6600',
                                                            borderRadius: '25px',
                                                            paddingLeft: '15px',
                                                        }}
                                                    />
                                                </Form.Group>
                                                <br />

                                                <Form.Group controlId="formButton">
                                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                                    <Button
                                                        variant="warning"
                                                        className="btn btn-block rounded-pill"
                                                        size="lg"
                                                        block
                                                        type="submit"
                                                        style={{
                                                            backgroundColor: '#FF6600',
                                                            border: 'none',
                                                            color: '#fff',
                                                            padding: '12px 20px',
                                                            fontSize: '16px',
                                                            borderRadius: '25px',
                                                        }}
                                                    >
                                                        Log In
                                                    </Button>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Login;
