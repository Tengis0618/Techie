import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import JobItem from '../component/JobObject';
import Spinner from '../component/Spinner';
import Header from '../component/Header';
import { myJobs, reset } from '../features/jobs/jobSlice';
import { FaFolder } from 'react-icons/fa';


function Dashboard() {
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

    dispatch(myJobs())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const onJob = () => {
    navigate('/createjob')
  }

  const onAppliedJobs = () => {
    navigate('/appliedjobs')
  }

  return (
    <>
      <Header />
      <section className='heading'>
        <p>Jobs Dashboard</p>
        <p>{user.username}</p>
        <div className='buttons'>
        <button className='btn' onClick={onJob}>
          <FaFolder /> Post a Job
        </button>
        <button className='btn' onClick={onAppliedJobs}>
          <FaFolder /> Applied Jobs
        </button>
        </div>
      </section>

      <section className='content'>
        {jobs.length > 0 ? (
          <div className='jobs'>
            {jobs.map((job) => (
              <JobItem key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <h3>You have not set any jobs</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard