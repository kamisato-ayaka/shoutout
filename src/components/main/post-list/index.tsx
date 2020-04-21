import React, { useMemo } from 'react'
import { useHistory } from "react-router-dom";
import { PostVars } from '../dashboard/types'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, UsernameVar, likePost, unlikePost } from '../../../redux/actions'
import { AppState } from '../../../redux/types'
import PostComment from '../../post-comment'

const PostList = () => {
  const dispatch = useDispatch()
  const history = useHistory()

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

    return postList.map((val: PostVars, index: any) => {
      const user: UsernameVar = val.username

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
        <li key={index}>
          <div onClick={() => toProfile()}><b>{user}</b></div>
          <div>{val.post}</div>

          <div>
            <button onClick={() => like(val)}>Like</button>
            {likesCount(val)}
          </div>

          <PostComment post={val} />
        </li>
      )
    })
  }, [dispatch, history, postList, userName])

  return (
    <ul>
      {userPost}
    </ul>
  )
}

export default PostList