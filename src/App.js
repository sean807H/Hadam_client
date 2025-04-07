import './App.css';
import Login from './route/login/Login';
import Signup from './route/signup/Signup';
import Nav from "./components/nav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/nav' element={<Nav />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
