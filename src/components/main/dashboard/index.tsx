import React from 'react'
import { DashboardVars } from './types';
import PostForm from '../post-form';
import PostList from '../post-list';
import Setting from '../setting';
import { useSelector, useDispatch } from 'react-redux';
import UserProfile from '../../user-profile';
import { toUserProfile } from '../../../redux/actions';
import { AppState } from '../../../redux/types';

const Dashboard: React.FC<DashboardVars> = ({
  userName
}) => {
  const dispatch = useDispatch()
  const gotoUserProfile = useSelector((state: AppState) => state.toUserProfileReducer)

  return (
    <>
      <h1 onClick={() => {dispatch(toUserProfile())}}>Shoutout</h1>
      <p>Hi, {userName}</p>

      {!gotoUserProfile ? <>
        <PostForm userName={userName} />
        <PostList userName={userName}/>
      </> : <UserProfile userName={userName}/>
      }

      <Setting />
    </>
  )
}

export default Dashboard