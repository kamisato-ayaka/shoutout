import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik'
import { PostCommentVars, CommentVars } from './types';
import { PostVars } from '../main/dashboard/types';
import { AppState } from '../../redux/types';
import { addComment } from '../../redux/actions';

const PostComment: React.FC<PostCommentVars> = ({
  post
}) => {

  const dispatch = useDispatch()

  const userName = useSelector((state: AppState) => state.getUserReducer)
  const postList: PostVars[] = useSelector((state: AppState) => state.postReducer)

  const [showComment, setShowComment] = useState<boolean>(false)

  const initialValues: Omit<CommentVars, "postID" | "usernameComment"> = {
    comment: ''
  }
  const comment = () => setShowComment(true)

  const onSubmit = (values: Omit<CommentVars, "postID" | "usernameComment">, { resetForm }: any) => {
    const commentData = {
      postID: post.id,
      usernameComment: userName,
      comment: values.comment
    }

    dispatch(addComment(commentData))
    resetForm()
  }

  const commentsCount = (post: PostVars) => {
    const comments = postList.filter((val: PostVars) => val.id === post.id)
    if (!comments) return []
    return (
      <>
        {comments.map((val: PostVars) => {
          return (
            <span key={val.id}>{val.comments.length}</span>
          )
        })}
      </>
    )
  }

  return (
    <>
      <button onClick={comment}>Comment</button>
      {commentsCount(post)}
      {!showComment ? ''
        : <>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {
              formik => (
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <div>
                      <input
                        type="text"
                        name="comment"
                        placeholder="Write your comment..."
                        value={formik.values.comment}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.comment && formik.errors.comment ? (
                        <div>{formik.errors.comment}</div>
                      ) : null}
                    </div>
                  </form>
                </>
              )
            }
          </Formik>

          <ul>
   git 
          </ul>
        </>
      }

    </>
  )
}

export default PostComment