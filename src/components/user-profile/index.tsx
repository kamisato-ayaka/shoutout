import React, { useMemo } from 'react'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { PostVars } from '../main/dashboard/types'
import { UsernameVar, followUser, unfollowUser, getUser, likePost, unlikePost } from '../../redux/actions'
import { AppState } from '../../redux/types'
import { UserVars } from '../signup/types'
import PostComment from '../post-comment'
import Setting from '../main/setting';
import Search from '../main/search';

const UserProfile = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const userName = useSelector((state: AppState) => state.logUserReducer)
  const postList: PostVars[] = useSelector((state: AppState) => state.postReducer)
  const user: UsernameVar = useSelector((state: AppState) => state.getUserReducer)
  const users: UserVars[] = useSelector((state: AppState) => state.signupReducer)

  const findUser: PostVars[] = postList.filter((val: PostVars) => val.username === user)

  const userAccount = useMemo(() => {

    const follow = (account: UserVars | undefined) => {
      const index = account?.followers.findIndex((val: string) => val === userName)
      const followData = {
        usernameToFollow: user, // account user
        usernameOnline: userName // online user
      }

      if (Number(index) === -1) {
        dispatch(followUser(followData))

      } else if (Number(index) > -1) {
        dispatch(unfollowUser(followData))
      }
    }

    const account = users.find((val: UserVars) => val.username === user)

    return (
      <>
        <h1>{user}</h1>
        <p>Followers {account?.followers.length} Following {account?.following.length}</p>
        {(userName === user) ? '' : <button onClick={() => follow(account)}>Follow</button>}
      </>
    )
  }, [user, users, dispatch, userName])

  const userPost = useMemo(() => {

    const like = (post: PostVars) => {
      const index = post.likes.findIndex((val: string) => val === userName)
      const likeData = {
        postID: post.id,
        usernameLike: userName
      }

      if (index === -1) {
        dispatch(likePost(likeData))
      }

      else if (Number(index) > -1) {
        dispatch(unlikePost(likeData))
      }
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

    const toProfile = () => {
      dispatch(getUser(user))
      history.push(`/${user}`)
    }

    return (
      <ul>
        {findUser.map((val: PostVars, index: any) =>
          <li key={index}>
            <div onClick={() => toProfile()}><b>{val.username}</b></div>
            <div>{val.post}</div>

            <div>
              <button onClick={() => like(val)}>Like</button>
              {likesCount(val)}
            </div>

            <PostComment post={val} />
          </li>)}
      </ul>
    )
  }, [dispatch, history, user, findUser, userName, postList])

  const security = useMemo(() => {
    return (
      <>
        <p>You must log in to view the page.</p>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"><button>Sign Up</button></Link>
      </>
    )
  }, [])

  return (
    <>
      <h1>Shoutout</h1>
      {(user === '') ?
        <>{security}
        </> :
        <>
          <Link to="/dashboard"><h3>Home</h3></Link>
          <Search />
          {userAccount}
          {userPost}

          {(userName === '') ?
            <>{security}</> : <Setting />}
        </>
      }
    </>
  )
}

export default UserProfile