import React from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from '../../../redux/actions'
import { Formik } from 'formik'
import { PostVars, DashboardVars } from '../dashboard/types'

const PostForm: React.FC<DashboardVars> = ({
  userName
}) => {

  const dispatch = useDispatch();
  const initialValues: PostVars = {
    username: '',
    post: '',
    comments: '',
    likes: ''
  }

  const onSubmit = (values: PostVars, { resetForm }: any) => {
    const newPost = {
      username: userName,
      post: values.post,
      comments: values.comments,
      likes: values.likes
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
                </div>
                <button type="submit">Post</button>
              </form>
            </>
          )
        }
      </Formik>
    </>
  )
}

export default PostForm