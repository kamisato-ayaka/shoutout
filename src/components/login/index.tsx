import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toSignup, toLogin, logUser } from '../../redux/actions'
import * as Yup from 'yup'
import { Formik } from 'formik'
import md5 from 'md5'
import { LoginVars } from './types'
import { UserVars } from '../signup/types'
import SignUp from '../signup'
import Dashboard from '../main/dashboard'
import { AppState } from '../../redux/types'

const Login = () => {
  const dispatch = useDispatch()

  const togoSignup = useSelector((state: AppState) => state.toSignupReducer)
  const togoLogin = useSelector((state: AppState) => state.toLoginReducer)
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

  const onSubmit = (values: LoginVars, { setSubmitting, resetForm }: any) => {
    setTimeout(() => {
      const user = userData.findIndex((val: UserVars) => val.username === values.username && val.password === md5(values.password))
      let loguser = values.username
      if (user > -1) {
        setSubmitting(false);
        dispatch(logUser(loguser))
        dispatch(toLogin())
        
      } else if (user === -1) {
        setInvalid(true)
        resetForm()
      }
    }, 100);
  }

  const signUp = () => {
    setInvalid(false)
    dispatch(toSignup())
  }

  return (
    <>
      {!togoLogin ?
        <Dashboard /> :
        <>
          {togoSignup ?
            <SignUp /> :
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
              <button onClick={() => dispatch(signUp())}>Sign Up</button>
            </>
          }
        </>
      }
    </>
  )
}

export default Login