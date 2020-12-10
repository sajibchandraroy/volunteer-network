import React, { useContext, useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Home.css';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://immense-garden-11788.herokuapp.com/events')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])
    return (
        <div className='container'>
            <div className='row d-flex'>
                <img
                    src={logo}
                    width="100"
                    height="50"
                    className="col-md-2 align-top"
                    alt="Volunteer Network"
                />
                <Nav className="offset-2 col-md-8">
                    <Nav.Item>
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link >Donation</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href='/registrationList'>Events</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>Blog</Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item>
                        <Nav.Link><Button variant="primary">Register</Button></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/volunteerList"><Button variant="dark">Admin</Button></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/" onClick={() => setLoggedInUser({})}><Button variant="warning">Sign Out</Button></Nav.Link>
                    </Nav.Item>                   
                </Nav>
            </div>


            <div>
                <label htmlFor="homepage-text"><h1>I GROW BY HELPING PEOPLE IN NEED</h1></label>
                <InputGroup style={{ width: "500px", margin: "auto" }} size="lg" className="mb-3">
                    <FormControl id="homepage-text" type="text" aria-label="Search..." aria-describedby="basic-addon2" />
                    <InputGroup.Append>
                        <Button variant="primary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            
            <div className='row'>
                {events.map(activity => {
                    return (
                        <div className='col-md-3 p-2' style={{ width: '14rem', backgroundColor: "transparent" }}>
                            <Card.Img variant="top" src={activity.image} />
                            <Card.Body style={{backgroundColor: 'orange'}}>
                                <Link to={"/register/" + activity.eventName}>
                                    <Card.Title>{activity.eventName}</Card.Title>
                                </Link>
                            </Card.Body>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Home;