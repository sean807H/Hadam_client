import './App.css';
import Login from './route/Login';
import Signup from './route/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
