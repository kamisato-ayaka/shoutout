import React, { useMemo } from 'react'
import { PostVars } from '../dashboard/types'
import { useSelector, useDispatch } from 'react-redux'
import { toUserProfile, getUser, UsernameVar, likePost } from '../../../redux/actions'
import { AppState } from '../../../redux/types'

const PostList = () => {
  const dispatch = useDispatch()

  const userName = useSelector((state: AppState) => state.logUserReducer)
  const following = useSelector((state: AppState) =>
    state.signupReducer.filter(
      (value) =>
        value.followers.findIndex((follower) => follower === userName) > -1
    )
  );
  const postList: PostVars[] = useSelector((state: AppState) =>
    state.postReducer.filter(
      (post) =>
        following.findIndex((user) => user.username === post.username) > -1
    )
  );
  const likes: string[] = useSelector((state: AppState) => state.likePostReducer)

  const post = useMemo(() => {
    const like = () => {
      const userlike = likes.findIndex((val: string) => val === userName)
      if (userlike === -1) {
        dispatch(likePost(userName))
      }
    }

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
  }, [dispatch, postList, userName, likes])

  return (
    <ul>
      {post}
    </ul>
  )
}

export default PostList