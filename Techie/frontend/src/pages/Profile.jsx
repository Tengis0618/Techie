import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../features/profile/profileSlice';
import Spinner from '../component/Spinner';
import { FaEllipsisH, FaExpand, FaUserPlus} from 'react-icons/fa'
import Header from '../component/Header';
import Leetcode from '../pages/Leetcode';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, profiles, isLoading, isError, message } = useSelector((state) => state.profile)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getProfile());
  }, [user, isError, dispatch, navigate, message]);

  if (isLoading) {
    return <Spinner />
  }

  const goUpdateProfile = () => {
    navigate('/update-profile');
  }

  const leetcodeInfo = () => {
    navigate('/leetcode');
  }

  return (
    <div>
      {profiles && (
        <div  className='profile'>
          <Header />
          <h2>User: {profiles.username}</h2>
          <div className="buttons">
          <button className='btn' onClick={goUpdateProfile}>
              <FaUserPlus />Update Profile
            </button>
            <button className='btn' onClick={leetcodeInfo}>
              <FaExpand />View Leetcode Info
            </button>
            </div>
          <div  className='detail'>
          {profiles.profile ? (
            <>
            <p>Name: {profiles.profile.firstName} {profiles.profile.lastName}</p>
            <p>Email: {profiles.email}</p>
            <p>Experience: {profiles.profile.experience}</p>
            <p>Projects: {profiles.profile.projects}</p>
            <p>Achievements: {profiles.profile.achievements}</p>
            <p>Skills: {profiles.profile.skills}</p>
            <p>Education: {profiles.profile.education}</p>
            <p>Leetcode Username: {profiles.leetcode}</p>
            </>
          ) : (
            <>
            <h1>Profile not set yet</h1>
            <p>Username: {profiles.username}</p>
            <p>Email: {profiles.email}</p>
            </>
          )}

          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
