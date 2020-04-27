import React from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { addPost, getUser } from '../../../redux/actions'
import { Formik } from 'formik'
import { PostVars } from '../dashboard/types'
import { AppState } from '../../../redux/types'
import { PostDiv, UserLink, UserText, ButtonPost } from '../../styles'

const PostForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const userName = useSelector((state: AppState) => state.logUserReducer)
  const posts = useSelector((state: AppState) => state.postReducer)

  const initialValues: Omit<PostVars, "comments" | "likes"> = {
    id: 0,
    username: '',
    post: ''
  }

  const onSubmit = (values: Omit<PostVars, "comments" | "likes">, { resetForm }: any) => {
    const newPost = {
      id: Number((posts.length - 1) + 1),
      username: userName,
      post: values.post,
      comments: [],
      likes: []
    }
    dispatch(addPost(newPost))
    resetForm()
  }

  const toProfile = () => {
    dispatch(getUser(userName))
    history.push(`/${userName}`)
  }

  const userImg = require('../../../images/pual.png');

  return (
    <PostDiv>
      <UserLink onClick={() => toProfile()}>
        <img src={userImg} alt=""></img>
        <UserText>{userName}</UserText>
      </UserLink>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {
          formik => (
            <>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <textarea
                    className="post-field"
                    name="post"
                    placeholder="Post your shoutout!"
                    value={formik.values.post}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <ButtonPost type="submit">Shoutout</ButtonPost>
                  {formik.touched.post && formik.errors.post ? (
                    <div>{formik.errors.post}</div>
                  ) : null}
                </div>
              </form>
            </>
          )
        }
      </Formik>
    </PostDiv>
  )
}

export default PostForm