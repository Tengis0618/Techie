import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createJob } from '../features/jobs/jobSlice';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';
import { FaDesktop, FaSignInAlt, FaSignOutAlt, FaUser, FaUserAlt } from 'react-icons/fa'

function JobForm() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    jobtype: 'Full-time',
    location: '',
    requirements: '',
    contacts: '',
    details: '',
  })

  const { title, company, jobtype, location, requirements, contacts, details } = formData
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      title,
      company,
      jobtype,
      location,
      requirements,
      contacts,
      details
    }
    dispatch(createJob(jobData));
    setFormData({
      title: '',
      company: '',
      jobtype: 'Full-time',
      location: '',
      requirements: '',
      contacts: '',
      details: '',
    })
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const goDashboard = () => {
    navigate('/dashboard');
  }

  return (
    <section className='form'>
      <h1 className='title'>Post A Job</h1>
      <button className='btn' onClick={goDashboard}>
              <FaDesktop /> Dashboard
            </button>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='title'>Company</label>
          <input
            type='text'
            name='company'
            id='company'
            value={company}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
            <select
              className='form-control'
              id='jobtype'
              name='jobtype'
              value={jobtype}
              onChange={onChange}
            >
              <option value='Full-time'>Full-time</option>
              <option value='Part-time'>Part-time</option>
              <option value='Internship'>Internship</option>
            </select>
          </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            type='text'
            name='location'
            id='location'
            value={location}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='requirements'>Requirements</label>
          <input
            type='text'
            name='requirements'
            id='requirements'
            value={requirements}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='contacts'>Contacts</label>
          <input
            type='text'
            name='contacts'
            id='contacts'
            value={contacts}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='details'>Details</label>
          <input
            type='text'
            name='details'
            id='details'
            value={details}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Job
          </button>
        </div>
      </form>
    </section>
  );
}

export default JobForm;
