import './App.css';
import Login from './route/login/Login';
import Signup from './route/signup/Signup';
import Nav from "./components/nav";
import Write from "./components/Write";
import Post from "./components/Post"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/nav' element={<Nav />}></Route>
                <Route path='/write' element={<Write />}></Route>
                <Route path='/post' element={<Post />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
