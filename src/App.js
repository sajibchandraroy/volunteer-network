import React, { createContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import VolunteerList from './components/VolunteerList/VolunteerList';
import AddEvent from './components/AddEvent/AddEvent';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Register from './components/Register/Register';
import RegistrationList from './components/RegistrationList/RegistrationList';

export const UserContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
  
    return (
        <div className="App">
            <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
            <Router>
              <Switch>
                <Route path="/home"><Home /></Route>
                <Route path="/login"><Login /></Route> 
                  <PrivateRoute path="/register/:activityName"><Register/></PrivateRoute>
                  <PrivateRoute path="/registrationList"><RegistrationList /></PrivateRoute>
                <Route path="/volunteerList"><VolunteerList /></Route>
                <Route path="/addEvent"><AddEvent /></Route>
                <Route exact path="/"><Home /></Route>
              </Switch>
            </Router>
          </UserContext.Provider>
        </div>
    );
}

export default App;
