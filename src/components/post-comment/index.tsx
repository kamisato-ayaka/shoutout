import React, { useMemo } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik'
import { PostCommentVars, CommentVars } from './types';
import { PostVars, CommentVar } from '../main/dashboard/types';
import { AppState } from '../../redux/types';
import { addComment, removeComment, getUser } from '../../redux/actions';
import { CommentImg, CommentForm, CommentPost, UserText, UserLink, CommentText, CommentList, ButtonPost } from '../styles'

const PostComment: React.FC<PostCommentVars> = ({
  showComment,
  post
}) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const userName = useSelector((state: AppState) => state.logUserReducer)
  const postList: PostVars[] = useSelector((state: AppState) => state.postReducer)


  const initialValues: Omit<CommentVars, "postID" | "usernameComment"> = {
    comment: ''
  }

  const onSubmit = (values: Omit<CommentVars, "postID" | "usernameComment">, { resetForm }: any) => {
    const commentData = {
      postID: post.id,
      usernameComment: userName,
      comment: values.comment
    }
    if (userName !== '') {
      dispatch(addComment(commentData))
      resetForm()
    }
  }

  const commentList = useMemo(() => {
    const findComment = postList.find((val: PostVars) => val.id === post.id)
    if (!findComment) return []

    const userImg = require('../../images/kristina.png');

    return (
      <ul>
        {findComment.comments.map((val: CommentVar, index: any) => {
          const toProfile = (val: CommentVar) => {
            history.push(`/${val.username}`)
            dispatch(getUser(val.username))
          }

          return (
            <CommentList key={index}>
              <UserLink onClick={() => toProfile(val)}>
                <img src={userImg} alt=""></img>
                <UserText>{val.username}</UserText>
              </UserLink>
              <CommentPost>
                <CommentText>{val.comment}</CommentText>
                {(val.username === userName || post.username === userName ) ? <ButtonPost onClick={() => dispatch(removeComment(val))}>Delete</ButtonPost> : ''}
              </CommentPost>
            </CommentList>
          )
        })}
      </ul>
    )
  }, [post.id, postList, dispatch, history, userName, post.username])

  const userProfile = require('../../images/pual.png');

  return (
    <>
      {!showComment ? ''
        :
        <>
          <CommentImg>
            <img src={userProfile} alt=""></img>
            <UserText>{userName}</UserText>
          </CommentImg>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {
              formik => (
                <CommentForm>
                  <form onSubmit={formik.handleSubmit}>
                    <div>
                      <textarea
                        className="comment-field"
                        name="comment"
                        placeholder="Write your comment..."
                        value={formik.values.comment}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      <ButtonPost type="submit">Reply</ButtonPost>
                      {formik.touched.comment && formik.errors.comment ? (
                        <div>{formik.errors.comment}</div>
                      ) : null}
                    </div>
                  </form>
                </CommentForm>
              )
            }
          </Formik>
          {commentList}
        </>
      }

    </>
  )
}

export default PostComment