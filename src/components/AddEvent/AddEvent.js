import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../images/logo.png';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import volunteer from '../../images/users.png';
import plusLogo from '../../images/plus 1.png';
import './AddEvent.css';

const AddEvent = () => {
    let history = useHistory();
    const {register, handleSubmit } = useForm();
    const onSubmit = data => {
        fetch('https://immense-garden-11788.herokuapp.com/addEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    history.push("/home");
                }
            })
    }
    return (
        <div className='container'>
            <div className='row'>
                <Navbar.Brand className="col-md-2" href='/'>
                    <img
                        src={logo}
                        width="150"
                        height="50"
                        className="align-top"
                        alt="Volunteer Network logo"
                    /></Navbar.Brand>
                <h5 className="offset-2 mt-4">Add Event</h5>
            </div>
            <div className='row'>
                <div className='sidebar'>
                    <Link to='/volunteerList'>
                        <div>
                            <img src={volunteer} alt=''/>
                            <h6>Volunteer Registration List</h6>
                        </div>
                    </Link>
                    <div>
                        <img src={plusLogo} alt=''/>
                        <h6>Add Event</h6>
                    </div>
                </div>
                <div className='admin-page-content'>
                    <form class='upload-form' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='title'>Event Title</label><label htmlFor='date'>Event Date</label><br/>
                        <input name="eventName" type="text" placeholder="Event Title" id='title'  ref={register}/>                       
                        <input name="eventDate" type="date" id='date'  ref={register} /><br/>
                        <label htmlFor='description'>Description</label><label htmlFor='image'>Banner</label><br/>                       
                        <input type="text" placeholder="Enter Description" id='description'  ref={register}/>
                        <input name="image" type="text" placeholder="Paste Image URL" id='image'  ref={register}/><br/>
                        <div className='text-right'><input  style={{width: '90px'}} className='btn btn-primary' type="submit" /></div>
                    </form>
                </div>
            </div>
            </div>
    );
};

export default AddEvent;