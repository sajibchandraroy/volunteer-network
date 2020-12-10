import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import logo from '../../images/logo.png';
import { UserContext } from '../../App';

const RegistrationList = () => {
    const [registrations, setRegistrations] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    

    useEffect(() => {
        fetch('https://immense-garden-11788.herokuapp.com/registrations?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setRegistrations(data));
    }, [isDeleted])

    const deleteProduct = (id) => {
        fetch(`https://immense-garden-11788.herokuapp.com/delete/${id}`, {
            method: 'DELETE',
               
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data) {
                    setIsDeleted(true)
                }
            })
    }

    return (
        <div className="container">
        <div className='row d-flex'>
                <img
                    src={logo}
                    width="100"
                    height="50"
                    className="col-md-2 align-top"
                    alt="Volunteer Network"
                />
                <Nav className="offset-4 col-md-6">
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
                        {loggedInUser.name}
                    </Nav.Item>
                    
                </Nav>
            </div>
            <section className="row">
            <div className="col-md-6">
            
            {
                registrations.map(activity => {
                    return (
                        <div className='row my-2' style={{width: '450px', border: '1px solid lightgray'}}>
                            <div className='col-sm-5'>
                                <img style={{ width: '200px', height: 'auto'}} className='my-3' variant="top" src={activity.selectedImage} alt="" />
                            </div>                           
                            <div className='col-sm-4 offset-3  mt-3'>                           
                                <h5>{activity.eventName}</h5>
                                <p>{(new Date(activity.eventDate).toDateString('dd/MM/yyyy'))}</p>                           
                                <div className='text-right'>
                                    <Button onClick={() => deleteProduct(activity._id)} variant="primary">Cancel</Button>
                                </div>
                            </div>                           
                        </div>
                    )
                })
            }
            </div>
            </section>

        </div>
    );
};

export default RegistrationList;