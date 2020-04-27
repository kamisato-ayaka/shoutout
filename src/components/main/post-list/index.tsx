import React, { useMemo } from 'react'
import { useHistory } from "react-router-dom";
import { PostVars } from '../dashboard/types'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, UsernameVar, likePost, unlikePost } from '../../../redux/actions'
import { AppState } from '../../../redux/types'
import PostComment from '../../post-comment'
import { PostDiv, UserLink, UserText, PostGroup, SocialGroup, SocialText, SocialLink, P } from '../../styles';

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
                <SocialText key={val.id}>{val.likes.length}</SocialText>
              )
            })}
          </>
        )
      }

      const toProfile = () => {
        dispatch(getUser(user))
        history.push(`/${user}`)
      }

      const userImg = require('../../../images/kristina.png');
      const likeImg = require('../../../images/like.svg');

      return (
        <li key={index}>
          <PostDiv>

            <UserLink onClick={() => toProfile()}>
              <img src={userImg} alt=""></img>
              <UserText>{user}</UserText>
            </UserLink>

            <PostGroup>
              <P>{val.post}</P>
            </PostGroup>

            <SocialGroup>
              <SocialLink>
                <img src={likeImg} alt="" onClick={() => like(val)} />
                {likesCount(val)}
              </SocialLink>
              <SocialLink>
                <PostComment post={val} />
              </SocialLink>
            </SocialGroup>
          </PostDiv>
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