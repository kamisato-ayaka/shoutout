import React, { useState, useMemo } from 'react'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { PostVars } from '../main/dashboard/types'
import { UsernameVar, followUser, unfollowUser, getUser, likePost, unlikePost, removePost } from '../../redux/actions'
import { AppState } from '../../redux/types'
import { UserVars } from '../signup/types'
import PostComment from '../post-comment'
import Setting from '../main/setting';
import Search from '../main/search';
import { Dboard, PostDiv, PostGroup, P, UserGroup, UserLink, UserText, UserButton, Header, Logo, Button, FormInvalid, SocialGroup, SocialLink, SocialText, FollowGroup, H1User, H2, UserInfo, H1, UserNameInfo, CommentGroup } from '../styles';

const UserProfile = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const userName = useSelector((state: AppState) => state.logUserReducer)
  const postList: PostVars[] = useSelector((state: AppState) => state.postReducer)
  const user: UsernameVar = useSelector((state: AppState) => state.getUserReducer)
  const users: UserVars[] = useSelector((state: AppState) => state.signupReducer)

  const [showComment, setShowComment] = useState<boolean>(false)

  const findUser: PostVars[] = postList.filter((val: PostVars) => val.username === user)

  const status = useMemo(() => {
    const account = users.find((val: UserVars) => val.username === user)
    const index = account?.followers.findIndex((val: string) => val === userName)
    if (Number(index) === -1 && userName !== '') {
      return 'Follow'

    } else if (Number(index) > -1) {
      return 'Unfollow'
    }

  }, [user, userName, users])

  const userAccount = useMemo(() => {

    const account = users.find((val: UserVars) => val.username === user)

    const follow = () => {
      const index = account?.followers.findIndex((val: string) => val === userName)

      const followData = {
        usernameToFollow: user, // account user
        usernameOnline: userName // online user
      }

      if (Number(index) === -1 && userName !== '') {
        dispatch(followUser(followData))

      } else if (Number(index) > -1) {
        dispatch(unfollowUser(followData))
      }
    }

    const UserProfile = require('../../images/katrina-p.png');

    return (
      <>
        <UserInfo>
          <img src={UserProfile} alt=""></img>
          <H1>{user}</H1>
          <UserNameInfo>@{user}</UserNameInfo>
        </UserInfo>

        <UserGroup>
          {(userName === user) ? <UserButton>Edit Profile</UserButton> : <UserButton onClick={follow}>{status}</UserButton>}
          <UserInfo>Lorem ipsum dolor sit amet. Mauris in mi vulputate. <br></br> Pellentesque eros nec, eleifend tellus. Curabitur maximus magna quis.</UserInfo>
          <FollowGroup>
            <H1User>{account?.followers.length}</H1User>
            <H2>Followers</H2>
          </FollowGroup>
          <FollowGroup>
            <H1User>{Number(account?.following.length) - 1}</H1User>
            <H2>Following</H2>
          </FollowGroup>
        </UserGroup>
      </>
    )
  }, [user, users, dispatch, userName, status])

  const userPost = useMemo(() => {

    const like = (post: PostVars) => {
      const index = post.likes.findIndex((val: string) => val === userName)
      const likeData = {
        postID: post.id,
        usernameLike: userName
      }

      if (index === -1 && userName !== '') {
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

    const comment = () => setShowComment(true)

    const commentsCount = (post: PostVars) => {
      const comments = postList.filter((val: PostVars) => val.id === post.id)
      if (!comments) return []
      return (
        <>
          {comments.map((val: PostVars) => {
            return (
              <SocialText key={val.id}>{val.comments.length}</SocialText>
            )
          })}
        </>
      )
    }

    const userImg = require('../../images/pual.png');
    const likeImg = require('../../images/like.svg');
    const commentImg = require('../../images/comment.svg');
    const deleteImg = require('../../images/delete.svg');

    return (
      <ul>
        {findUser.map((val: PostVars, index: any) =>
          <li key={index}>
            <PostDiv>

              <UserLink onClick={() => toProfile()}>
                <img src={userImg} alt=""></img>
                <UserText>{val.username}</UserText>
              </UserLink>

              <PostGroup>
                <P>{val.post}</P>
              </PostGroup>

              <SocialGroup>
                <SocialLink>
                  <img src={likeImg} alt="" title="Like" onClick={() => like(val)} />
                  {likesCount(val)}
                </SocialLink>

                <SocialLink>
                  <img src={commentImg} alt="" title="Comment" onClick={comment} />
                  {commentsCount(val)}
                </SocialLink>
                {(val.username === userName) ?
                  <SocialLink>
                    <img src={deleteImg} alt="" title="Delete" onClick={() => dispatch(removePost(val))} />
                  </SocialLink>
                  : ''}
              </SocialGroup>

              <CommentGroup>
                <PostComment
                  showComment={showComment}
                  post={val} />
              </CommentGroup>


            </PostDiv>
          </li>)}
      </ul>
    )
  }, [dispatch, history, user, findUser, userName, postList, showComment])

  const security = useMemo(() => {
    return (
      <>
        <FormInvalid>You must log in to view the page.</FormInvalid>
        <Link to="/login"><Button>Log In</Button></Link>
        <Link to="/signup"><Button>Sign Up</Button></Link>
      </>
    )
  }, [])

  const logo = require('../../images/logo-s.svg');
  return (
    <Dboard>
      <Header>
        <Logo>
          <Link to="/dashboard"><img src={logo} alt=""></img></Link>
        </Logo>
        <Search />
      </Header>
      {(user === '') ?
        <>{security}
        </> :
        <>
          {userAccount}
          {userPost}

          {(userName === '') ?
            <>{security}</> : <Setting />}
        </>
      }
    </Dboard>
  )
}

export default UserProfile