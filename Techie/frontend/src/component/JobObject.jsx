import { useDispatch, useSelector } from 'react-redux'
import { deleteJob, applyJob } from '../features/jobs/jobSlice'
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { FaCentercode, FaFileInvoice, FaNapster, FaRemoveFormat, FaSave, FaTrash } from 'react-icons/fa'

function JobItem({ job }) {
  const [key, setKey] = useState(0);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  function onSubmit(id) {
    setKey(prevKey => prevKey + 1);
    dispatch(deleteJob(id));
  }

  const onApply = (id) => {
    setKey(prevKey => prevKey + 1);
    dispatch(applyJob(id));
  }
  return (
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
          
        <button onClick={() => {onSubmit(job._id)}} className='btn'>
        <FaTrash /> Delete
      </button>
      
      <button onClick={() => {onApply(job._id)}} className='btn'>
        <FaFileInvoice /> Apply
      </button>
      </div>
      ): (
        <h1>Login or Sign Up to apply to jobs :)</h1>
      )}
      
    </div>
  )
}

export default JobItem