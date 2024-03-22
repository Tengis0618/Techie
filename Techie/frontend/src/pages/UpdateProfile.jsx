import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, getProfile } from '../features/profile/profileSlice';
import { FaUser} from 'react-icons/fa'
import Header from '../component/Header';
import Spinner from '../component/Spinner';
function EditUserComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, profiles, isLoading, isError, message } = useSelector((state) => state.profile)

  useEffect(()=>{
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getProfile());

  }, [user, navigate, isError, dispatch, message])

  if (isLoading) {
    <Spinner />
  }

  const [formData, setFormData] = useState(
    {
      firstName: profiles.profile.firstName,
      lastName: profiles.profile.lastName,
      email: profiles.email,
      experience: profiles.profile.experience,
      projects: profiles.profile.projects,
      achievements: profiles.profile.achievements,
      skills: profiles.profile.skills,
      education: profiles.profile.education,
      leetcode: profiles.leetcode,
    }
  )

  const { firstName, lastName, email, experience, projects, achievements, skills, education, leetcode } = formData

  const onSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      firstName,
      lastName,
      email,
      experience,
      projects,
      achievements,
      skills,
      education,
      leetcode,
    }
    dispatch(updateProfile(profileData));
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      experience: '',
      projects: '',
      achievements: '',
      skills: '',
      education: '',
      leetcode: '',
    })
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const goProfile = () => {
    navigate('/profile')
  }

  return (
    <section className='form'>
      <Header/>
      <h1 className='title'>Update User Profile</h1>
      <button className='btn' onClick={goProfile}>
              <FaUser /> Profile
            </button>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            name='firstName'
            id='firstName'
            value={firstName}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            name='lastName'
            id='lastName'
            value={lastName}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='emailn'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='experience'>Experience</label>
          <input
            type='text'
            name='experience'
            id='experience'
            value={experience}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='education'>Education</label>
          <input
            type='text'
            name='education'
            id='education'
            value={education}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='achievements'>Achievements</label>
          <input
            type='text'
            name='achievements'
            id='achievements'
            value={achievements}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='projects'>Projects</label>
          <input
            type='text'
            name='projects'
            id='projects'
            value={projects}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='skills'>Skills</label>
          <input
            type='text'
            name='skills'
            id='skills'
            value={skills}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='leetcode'>Leetcode Username</label>
          <input
            type='text'
            name='leetcode'
            id='leetcode'
            value={leetcode}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Update
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditUserComponent;
