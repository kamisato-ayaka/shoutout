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

    const account = users.find((val: UserVars) => val.username === user)

    return (
      <>
        <h1>{user}</h1>
        <p>Followers {account?.followers.length} Following {account?.following.length}</p>
        <button onClick={() => follow()}>Follow</button>
      </>
    )
  }, [user, users, dispatch, userName])

  const userPost = useMemo(() => {
    const like = (post: PostVars) => {
      const likeData = {
        postID: post.id,
        usernameLike: userName
      }
      dispatch(likePost(likeData))
    }

    const likesCount = (post: PostVars) => {
      const likes = postList.filter((val: PostVars) => val.id === post.id)
      if (!likes) return []
      return (
        <>
          {likes.map((val: PostVars) => {
            return (
              <span key={val.id}>{val.likes.length}</span>
            )
          })}
        </>
      )
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
              <button onClick={() => like(val)}>Like</button>
              {likesCount(val)}
            </div>
          </li>)}
      </ul>
    )
  }, [dispatch, user, findUser, userName, postList])

  return (
    <>
      {userAccount}
      {userPost}
    </>
  )
}

export default UserProfile