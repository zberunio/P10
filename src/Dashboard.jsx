import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import { API_ENDPOINT } from './Api';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    // Verify if User is in session in localStorage
    useEffect(() => {
        const fetchDecodedUserID = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Fetched token:', token); // Debugging token
                if (!token) {
                    throw new Error('No token found');
                }
                const response = JSON.parse(token);
                const decoded_token = jwtDecode(response.token);
                console.log('Decoded token:', decoded_token); // Debugging decoded token
                setUser(decoded_token);
                setLoading(false); // Update loading state
            } catch (error) {
                console.error('Token parsing error:', error);
                navigate('/login');
            }
        };

        fetchDecodedUserID();
    }, [navigate]);

    // Perform logout method
    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading until the user is fetched
    }

    return (
        <>
            {/* Set body background to black */}
            <style>
                {`
                    body {
                        background-color: black;
                        color: white;
                    }
                `}
            </style>

            {/* Orange header */}
            <Navbar style={{ backgroundColor: 'orange' }} variant="dark">
                <Container>
                    <Navbar.Brand href="#home" style={{ color: 'black' }}>Naga College Foundation, Inc.</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#users" style={{ color: 'black' }}>Users</Nav.Link>
                        <Nav.Link href="#departments" style={{ color: 'black' }}>Departments</Nav.Link>
                        <Nav.Link href="#courses" style={{ color: 'black' }}>Courses</Nav.Link>
                    </Nav>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavDropdown
                                title={user ? `User: ${user.username}` : 'Dropdown'}
                                id="basic-nav-dropdown"
                                align="end"
                                style={{ color: 'black' }}
                            >
                                <NavDropdown.Item href="#" style={{ color: 'black' }}>Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#" style={{ color: 'black' }}>Settings</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={handleLogout} style={{ color: 'black' }}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Dashboard;
