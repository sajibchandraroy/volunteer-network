import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import logo from '../../images/logo.png';
import { UserContext } from '../../App';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './Register.css';

const Register = () => {
    let history = useHistory();
    const { activityName } = useParams();
    const { register,handleSubmit, errors } = useForm();
    const [events, setEvents] = useState([]);
    const activity = events.find(task => task.eventName === activityName);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(activity)

    const selectedEvent ={...activity} 
    const selectedImage = selectedEvent.image;

    useEffect(() => {
        fetch('https://immense-garden-11788.herokuapp.com/events')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, []);
    const onSubmit = data => {
        const newRegistration = {selectedImage, ...data };
        
        fetch('https://immense-garden-11788.herokuapp.com/addRegistration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRegistration)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    history.push("/registrationList");
                }
            })
    }
    return (
        <div>
            <img className='logo' src={logo} alt="Volunteer Network" /> <br /><br />
            <div className='box-model'>
                <h3>Register As A Volunteer</h3>
                <form class='upload-form' onSubmit={handleSubmit(onSubmit)}>
                    <input name="name" type="text" defaultValue={loggedInUser.name} placeholder="Full Name" ref={register} /><br/>
                    <input name="email" type="email" defaultValue={loggedInUser.email} placeholder="Enter email" ref={register({ required: true })} /><br/>
                    <input name="eventDate" type="date" ref={register({ required: true })} /><br/>
                    <input type="text" placeholder="Description" ref={register} /><br/>
                    <input name='eventName' type="text" defaultValue={activityName} placeholder="Enter Volunteer Activity" ref={register} /><br/>
                    {errors.exampleRequired && <span className='error'>This field is required</span>}
                    <input type="submit" />
                </form>                           
            </div>
        </div>
    );
};

export default Register;