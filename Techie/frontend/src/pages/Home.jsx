import React from 'react';
import Header from '../component/Header.jsx';
import { getJobs, reset} from '../features/jobs/jobSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../component/Spinner.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applyJob } from '../features/jobs/jobSlice';
import { FaFileInvoice } from 'react-icons/fa'


const Home = () => {
    const [key, setKey] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    const { jobs, isLoading, isError, message } = useSelector(
        (state) => state.jobs
      )
    useEffect(() => {
        if (isError) {
          console.log(message)
        }
    
        dispatch(getJobs())
    
        return () => {
          dispatch(reset())
        }
      }, [navigate, isError, message, dispatch])

    if (isLoading) {
        <Spinner />
    }  

    const onApply = (id) => {
      setKey(prevKey => prevKey + 1);
      dispatch(applyJob(id));
    }
    return (
        <>
            <Header />
            {user ? (
              <h2>Hello, {user.username}</h2>
            ) : (
              <h2>Welcome to Job Portal</h2>
            )}
            <section className='content'>
                {jobs.length > 0 && (
                <div className='jobs'>
                    {jobs.map((job) => (
                    <div className='job'>
                    <div>{new Date(job.createdAt).toLocaleString('en-US')}</div>
                    <h2>{job.title}</h2>
                    <h3>Company: {job.company}</h3>
                    <h3>Job Type: {job.jobtype}</h3>
                    <h3>Job Location: {job.location}</h3>
                    <h3>Job Requirements: {job.requirements}</h3>
                    <h3>Job Contacts: {job.contacts}</h3>
                    <h3>Job Details: {job.details}</h3>
                    {user ? (
                      <div className='delapp'>
                        <button onClick={() => {onApply(job._id)}} className='btn'>
                          <FaFileInvoice /> Apply
                        </button>
                      </div>
                    ): (
                      <h1>Login or Sign Up to apply to jobs :)</h1>
                    )}
                    
                  </div>
                    ))}
                </div>
                ) }
            </section>
        </>
    )
}

export default Home;