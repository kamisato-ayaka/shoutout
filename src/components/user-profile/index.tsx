import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PostVars, DashboardVars } from '../main/dashboard/types'
import { UsernameVar, followUser, toUserProfile, getUser, likePost } from '../../redux/actions'
import { AppState } from '../../redux/types'

const UserProfile: React.FC<DashboardVars> = ({
  userName
}) => {
  const dispatch = useDispatch()
  const postList: PostVars[] = useSelector((state: AppState) => state.postReducer)
  const user: UsernameVar = useSelector((state: AppState) => state.getUserReducer)
  const likes: string[] = useSelector((state: AppState) => state.likePostReducer)

  const findUser: PostVars[] = postList.filter((val: PostVars) => val.username === user)

  const userProfile = useMemo(() => {
    const like = () => {
      const userlike = likes.findIndex((val: string) => val === userName)
      if (userlike === -1) {
        dispatch(likePost(userName))
      }
    }
    return (
      <ul>
        {findUser.map((val: PostVars, index: any) =>
          <li key={index}>
            <div onClick={() => {
              dispatch(toUserProfile())
              dispatch(getUser(user))
            }}>{val.username}</div>
            <div>{val.post}</div>
            <div>
            <button onClick={() => like()}>Like</button>
            <span>{likes.length}</span>
          </div>
          </li>)}
      </ul>
    )
  }, [dispatch, user, findUser, likes, userName])

  const follow = () => {
    const followData = {
      usernameFollowed: user,
      usernameToFollow: userName
    }
    dispatch(followUser(followData))
  }

  return (
    <>
      <h1>{user}</h1>
      <button onClick={() => follow()}>Follow</button>
      {userProfile}
    </>
  )
}

export default UserProfile