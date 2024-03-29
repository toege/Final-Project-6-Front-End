
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu.jsx';
import Login from "./components/LoginPage/Login.jsx"
import { Signup } from "./components/LoginPage/Signup.jsx"
import { Workout } from './components/WorkoutPage/Workout.jsx';
import SelectPage from './components/WorkoutPage/SelectPage/SelectPage.jsx';
import EditPage from './components/WorkoutPage/EditPage/EditPage.jsx';
import woData from './components/WorkoutPage/data.js';
import { createContext, useState } from 'react';
import HomePage from './components/WorkoutPage/SelectPage/HomePage.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import { Profile } from './components/Profile/Profile.jsx';
import { LogWorkout } from './components/LogHistory/LogWorkout.jsx';


const MainContext = createContext()

const initWorkout = {
    logDat: "",
    exercises: [],   
    notes: ""
}

const initialData = {
    id: 0,
    username: '',
    email: '',
    roles: [],
};
// Original is commented out at the bootum. Need to update to implement the Workout page
// This uncommented part is a proxy to direct the app to the workout page
function App() {
    const [data, setData] = useState(woData);
    const [workout, setWorkout] = useState(initWorkout); 
      const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  const [users, setUsers] = useState([]);
  const temp = localStorage.getItem('username');
  const [person, setPerson] = useState(initialData);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      const userToken = localStorage.getItem('userToken');
      try {
        const response = await axios.get('http://localhost:4000/users', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response.data.status === "success") {
          setUsers(response.data.data);
        } else {
          setError("Failed to fetch users. Please try again later.");
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
        setError("Failed to fetch users. Please try again later.");
      }
    };
    fetchWorkouts();
  }, []);

  useEffect(() => {
    const matchedUser = users.find(user => user.username === temp);
    if (matchedUser) {
      setPerson({
        id: matchedUser.id,
        username: matchedUser.username,
        email: matchedUser.email,
        roles: matchedUser.roles.map(role => role.name), 
      });
    }
  }, [users, temp]);

    // fjern
    return (
        <>
          <div className="container">
            <header className="header">
                < Menu />
            </header>
            <div className="content">
            <MainContext.Provider  value = { {data: data, workout: workout, setData: setData, setWorkout: setWorkout, person:person, error:error, setIsAuthenticated:setIsAuthenticated} } >
                      {/* {!isAuthenticated ? <LoginSignin/> : null} */}
                <Routes>
                    <Route path="home" element={<HomePage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="/" element={< Signup/>} />
                    <Route path='create' element={<Workout />} >
                        <Route path='workouts' element={< SelectPage />} />
                        <Route path='edit/:index' element={< EditPage />} />
                    </Route> 
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/log" element={<LogWorkout/>} />
                </Routes>
            </MainContext.Provider>
          </div>
        </div>
        </>
    );
}
  
  export { App, MainContext };

function isLoggedIn() {
  return !!localStorage.getItem('userToken');
}


