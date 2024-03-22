import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import JobItem from '../component/JobObject';
import Spinner from '../component/Spinner';
import Header from '../component/Header';
import { getAppliedJobs, reset } from '../features/jobs/jobSlice';
import { FaFolder } from 'react-icons/fa'

function AppliedJobs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { jobs, isLoading, isError, message } = useSelector(
    (state) => state.jobs
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getAppliedJobs())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const onDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <>
      <Header />
      <section className='heading'>
        <p>Applied Jobs</p>
        <p>{user.username}</p>
        <button className='btn' onClick={onDashboard}>
              <FaFolder /> Back to Dashboard
            </button>
      </section>

      <section className='content'>
        {jobs.length > 0 ? (
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
            </div>
            ))}
          </div>
        ) : (
          <h3>You have not set any jobs</h3>
        )}
      </section>
    </>
  )
}

export default AppliedJobs