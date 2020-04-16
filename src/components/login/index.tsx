import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toSignup, toLogin } from '../../redux/actions'
import * as Yup from 'yup'
import { Formik } from 'formik'
import md5 from 'md5'
import { LoginVars } from './types'
import { UserVars } from '../signup/types'
import SignUp from '../signup'
import Dashboard from '../main/dashboard'

const Login = () => {
  const dispatch = useDispatch()

  const togoSignup = useSelector((state: any) => state.toSignupReducer)
  const togoLogin = useSelector((state: any) => state.toLoginReducer)
  const userData: UserVars[] = useSelector((state: any) => state.signupReducer)

  const [userName, setUserName] = useState<any>()

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
      if (user > -1) {
        setSubmitting(false);
        setUserName(values.username)
        dispatch(toLogin())
      } else if (user === -1) {
        resetForm()
      }
    }, 100);
  }

  return (
    <>
      {!togoLogin ?
        <Dashboard userName={userName} /> :
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
              <button onClick={() => dispatch(toSignup())}>Sign Up</button>
            </>
          }
        </>
      }
    </>
  )
}

export default Login