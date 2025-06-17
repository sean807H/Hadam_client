import './App.css';
import Home from './route/Home_Screen';
import Signup from './route/signup/Signup';
import Calendar from "./route/calendar/calendar"
import Nav from "./components/nav";
import Splash from './route/SplashScreen/SplashScreen'
import Write from "./route/write/Write";
import Post from "./route/diary/Post"
import Community from "./route/community/Community"
import Login from "./route/login/Login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/calendar' element={<Calendar />}></Route>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/nav' element={<Nav />}></Route>
                <Route path='/splash' element={<Splash />}></Route>
                <Route path='/write' element={<Write />}></Route>
                <Route path='/post' element={<Post />}></Route>
                <Route path='/community' element={<Community/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
