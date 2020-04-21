import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/actions'
import * as Yup from 'yup'
import { Formik } from 'formik'
import md5 from 'md5'
import { LoginVars } from './types'
import { UserVars } from '../signup/types'
import { AppState } from '../../redux/types'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userData: UserVars[] = useSelector((state: AppState) => state.signupReducer)

  const [invalid, setInvalid] = useState<boolean>(false)
  const initialValues: LoginVars | null = {
    username: '',
    password: '',
  }

  const validationSchema: Yup.ObjectSchema<LoginVars> = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required")
  })

  const onSubmit = (values: LoginVars, { resetForm }: any) => {
    const user = userData.findIndex((val: UserVars) => val.username === values.username && val.password === md5(values.password))
    let loguser = values.username
    if (user > -1) {
      dispatch(loginUser(loguser))
      history.replace("/dashboard")

    } else if (user === -1) {
      setInvalid(true)
      resetForm()
    }
  }

  const signUp = () => setInvalid(false)

  return (
    <>
      <h1>Log In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}>
        {
          formik => (
            <>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                <button type="submit">Log In</button>
              </form>
            </>
          )
        }
      </Formik>
      {!invalid ? '' : <p className="message">Account doesn't exist.</p>}
      <Link to="/signup"><button onClick={() => signUp()}>Sign Up</button></Link>
    </>
  )
}

export default Login