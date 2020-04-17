import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PostVars } from '../main/dashboard/types'
import { UsernameVar, followingUser, toUserProfile, getUser, likePost } from '../../redux/actions'
import { AppState } from '../../redux/types'
import { UserVars } from '../signup/types'

const UserProfile = () => {
  const dispatch = useDispatch()
  
  const userName = useSelector((state: AppState) => state.logUserReducer)
  const postList: PostVars[] = useSelector((state: AppState) => state.postReducer)
  const user: UsernameVar = useSelector((state: AppState) => state.getUserReducer)
  const likes: string[] = useSelector((state: AppState) => state.likePostReducer)
  const users: UserVars[] = useSelector((state: AppState) => state.signupReducer)

  const findUser: PostVars[] = postList.filter((val: PostVars) => val.username === user)

  const userAccount = useMemo(() => {
    const follow = () => {
      const followData = {
        usernameToFollow: user, // account user
        usernameOnline: userName // online user
      }
      dispatch(followingUser(followData))
    }

    const account = users.find((val:UserVars) => val.username === user)
    return (
      <>
        <h1>{user}</h1>
        <p>Followers {account?.followers.length} Following {account?.following.length}</p>
        <button onClick={() => follow()}>Follow</button>
      </>
    )
  }, [user, users, dispatch, userName])

  const userPost = useMemo(() => {
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
            }}><b>{val.username}</b></div>
            <div>{val.post}</div>
            <div>
              <button onClick={() => like()}>Like</button>
              <span>{likes.length}</span>
            </div>
          </li>)}
      </ul>
    )
  }, [dispatch, user, findUser, likes, userName])

  return (
    <>
      {userAccount}
      {userPost}
    </>
  )
}

export default UserProfile