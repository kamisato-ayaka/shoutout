import React, { useMemo } from 'react'
import { PostVars } from '../dashboard/types'
import { useSelector, useDispatch } from 'react-redux'
import { toUserProfile, getUser, UsernameVar, likePost } from '../../../redux/actions'
import { AppState } from '../../../redux/types'
import { UserVars } from '../../signup/types'

const PostList = () => {
  const dispatch = useDispatch()
  
  const userName = useSelector((state: AppState) => state.logUserReducer)
  const users = useSelector((state:AppState) => state.signupReducer) 
  const postList: PostVars[] = useSelector((state: AppState) => state.postReducer)
  const likes: string[] = useSelector((state: AppState) => state.likePostReducer)

  const post = useMemo(() => {
    const like = () => {
      const userlike = likes.findIndex((val: string) => val === userName)
      if (userlike === -1) {
        dispatch(likePost(userName))
      }
    }

    const userFollowing = users.filter((user:UserVars) => user.username === userName).map((user: UserVars) => user.following)
    
    const followingPost = postList.map((val:PostVars) => val.username)

    console.log(userFollowing);
    console.log(followingPost);
    

    return postList.map((val: PostVars, index: any) => {
      const user: UsernameVar = val.username

      const toProfile = () => {
        dispatch(toUserProfile())
        dispatch(getUser(user))
      }

      
      return (
        <li key={index}>
          <div onClick={() => toProfile()}><b>{user}</b></div>
          <div>{val.post}</div>
          <div>
            <button onClick={() => like()}>Like</button>
            <span>{likes.length}</span>
          </div>
        </li>
      )
    })
  }, [dispatch, postList, userName, likes, users])

  return (
    <ul>
      {post}
    </ul>
  )
}

export default PostList