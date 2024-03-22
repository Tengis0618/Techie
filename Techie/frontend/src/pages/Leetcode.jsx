import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLeetcode } from '../features/leetcode/leetcodeSlice';
import Spinner from '../component/Spinner';
import { FaUserPlus, FaUserAlt} from 'react-icons/fa'
import Header from '../component/Header';

const Leetcode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, profiles, isLoading, isError, message } = useSelector((state) => state.profile)
    const {leetcode, loading, error} = useSelector((state) => state.leetcode)

    useEffect(() => {
        if (isError || error) {
          console.log(message)
        }
    
        if (!user) {
          navigate('/login')
        }
    
        dispatch(getLeetcode(profiles.leetcode));
      }, [user, isError, dispatch, navigate, message, profiles.leetcode, error]);
    
      if (isLoading) {
        return <Spinner />
      }

      const goProfile = () => {
        navigate('/profile')
      }

      return (
        <>
        <Header />
        <button className='btn' onClick={goProfile}>
              <FaUserAlt />Back to Profile
            </button>
        { leetcode === null ? (
          <div>
            <h2>Profile not found :/</h2>
            <p>Check your username and try again!</p>
          </div>
        ) : (
        <div>
            <h2>Leetcode Username: {profiles.leetcode}</h2>
            <p>Total questions solved: {leetcode.totalSolved}</p>
            <p>Easy: {leetcode.easySolved}</p>
            <p>Medium: {leetcode.mediumSolved}</p>
            <p>Hard: {leetcode.hardSolved}</p>
        </div>
        )}
        </>
      )
}

export default Leetcode
