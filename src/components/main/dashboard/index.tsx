import React from 'react'
import PostForm from '../post-form';
import PostList from '../post-list';
import Setting from '../setting';
import { useSelector, useDispatch } from 'react-redux';
import UserProfile from '../../user-profile';
import { toUserProfile, getUser } from '../../../redux/actions';
import { AppState } from '../../../redux/types';
import Search from '../search';

const Dashboard = () => {
  const dispatch = useDispatch()

  const userName = useSelector((state: AppState) => state.logUserReducer)
  const gotoUserProfile = useSelector((state: AppState) => state.toUserProfileReducer)

  const toProfile = () => {
    dispatch(toUserProfile())
    dispatch(getUser(userName))
  }

  return (
    <>
      <h1>Shoutout</h1>
      <p onClick={() => toProfile()}>Hi, {userName}</p>
      <Search />

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