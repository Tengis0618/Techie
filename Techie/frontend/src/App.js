import './App.css';
import{BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';
import Login from './pages/Login.jsx';
import Register from './pages/Signup.jsx';
import Home from './pages/Home';
import UserProfile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import JobForm from './pages/JobForm';
import EditUserComponent from './pages/UpdateProfile';
import Leetcode from './pages/Leetcode';
import AppliedJobs from './pages/AppliedJobs';

function App() {
  return (
    <>   
    <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/dashboard' element = {<Dashboard />} />
            <Route path='/createjob' element = {<JobForm />} />
            <Route path='/update-profile' element = {<EditUserComponent />} />
            <Route path='/leetcode' element = {<Leetcode />} />
            <Route path='/appliedjobs' element = {<AppliedJobs />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
