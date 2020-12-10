import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import deleteButton from '../../images/trash-2 9.png';
import Button from 'react-bootstrap/Button';
import volunteer from '../../images/users.png';
import plusLogo from '../../images/plus 1.png';


const VolunteerList = () => {
    const [volunteerList, setVolunteerList] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        fetch('https://immense-garden-11788.herokuapp.com/admin')
            .then(res => res.json())
            .then(data => setVolunteerList(data))
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
            <div className='row'>             
                <Navbar.Brand className="col-md-2" href='/'>
                    <img
                        src={logo}
                        width="150"
                        height="50"
                        className="align-top"
                        alt="Volunteer Network logo"
                    />
                </Navbar.Brand>               
                <h5 className="offset-2 mt-4">Volunteer Registration List</h5>
            </div>
            <div className='row'>
                <div className='sidebar'>
                    <div>
                        <img src={volunteer} alt=''/>
                        <h6>Volunteer Registration List</h6>
                    </div>
                    <Link to='/addEvent'>
                        <div>
                            <img src={plusLogo} alt=''/>
                            <h6>Add Event</h6>
                        </div>
                    </Link>
                </div>
                <div className='admin-page-content'>
                    <Table hover>                   
                        <thead style={{backgroundColor: '#dfe6e9', color: '#636e72' }}>
                            <tr>
                                <th>Name</th>
                                <th>Email ID</th>
                                <th>Registration Date</th>
                                <th>Volunteer List</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {volunteerList.map(activity => {
                            return (
                               <tbody>
                                    <tr>
                                        <td>{activity.name}</td>
                                        <td>{activity.email}</td>
                                        <td>{(new Date(activity.eventDate).toDateString('dd/MM/yyyy'))}</td>
                                        <td>{activity.eventName}</td>
                                        <td>
                                            <Button onClick={() => deleteProduct(activity._id)} variant="danger">
                                                <img style={{ width: '20px', height: '20px' }} src={deleteButton} alt="" />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>                               
                            )
                        })}
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default VolunteerList;