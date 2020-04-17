import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../../redux/actions'
import { Formik } from 'formik'
import { PostVars } from '../dashboard/types'
import { AppState } from '../../../redux/types'

const PostForm = () => {
  const dispatch = useDispatch();

  const userName = useSelector((state: AppState) => state.logUserReducer)

  const initialValues:  Omit<PostVars,"comments" | "likes"> = {
    username: '',
    post: ''
  }

  const onSubmit = (values: Omit<PostVars,"comments" | "likes">, { resetForm }: any) => {
    const newPost = {
      username: userName,
      post: values.post,
      comments: [],
      likes: []
    }
    dispatch(addPost(newPost))
    resetForm()
  }
  return (
    <>
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
                    name="post"
                    placeholder="Post your shoutout!"
                    value={formik.values.post}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.post && formik.errors.post ? (
                    <div>{formik.errors.post}</div>
                  ) : null}
                  <button type="submit">Post</button>
                </div>
              </form>
            </>
          )
        }
      </Formik>
    </>
  )
}

export default PostForm