import React from 'react'
import PostForm from '../post-form';
import PostList from '../post-list';
import Setting from '../setting';
import { useSelector, useDispatch } from 'react-redux';
import UserProfile from '../../user-profile';
import { toUserProfile } from '../../../redux/actions';
import { AppState } from '../../../redux/types';

const Dashboard = () => {
  const dispatch = useDispatch()
  
  const userName = useSelector((state: AppState) => state.logUserReducer)
  const gotoUserProfile = useSelector((state: AppState) => state.toUserProfileReducer)

  return (
    <>
      <h1 onClick={() => { dispatch(toUserProfile()) }}>Shoutout</h1>
      <p>Hi, {userName}</p>

      {!gotoUserProfile ? <>
        <PostForm />
        <PostList />
      </> : <UserProfile />
      }

      <Setting />
    </>
  )
}

export default Dashboard