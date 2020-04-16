import React, { useMemo } from 'react'
import { PostVars, DashboardVars } from '../dashboard/types'
import { useSelector, useDispatch } from 'react-redux'
import { toUserProfile, getUser, UsernameVar, likePost } from '../../../redux/actions'

const PostList: React.FC<DashboardVars> = ({
  userName
}) => {

  const dispatch = useDispatch()
  const postList: PostVars[] = useSelector((state: any) => state.postReducer)
  const likes: string[] = useSelector((state: any) => state.likePostReducer)

  const post = useMemo(() => {
    const like = () => {
      const userlike = likes.findIndex((val: string) => val === userName)
      if (userlike === -1) {
        dispatch(likePost(userName))
      }
    }

    return postList.map((val: PostVars, index: any) => {
      const user: UsernameVar = val.username
      return (
        <li key={index}>
          <div onClick={() => {
            dispatch(toUserProfile())
            dispatch(getUser(user))
          }}>{user}</div>
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