import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toSignup, addUser } from '../../redux/actions';
import * as Yup from 'yup'
import { Formik } from 'formik'
import md5 from 'md5';
import { UserVars } from './types';

const SignUp = () => {
  const dispatch = useDispatch();
  const userData: UserVars[] = useSelector((state: any) => state.signupReducer)

  const [invalid, setInvalid] = useState<boolean>(false)

  const initialValues: UserVars | null = {
    username: '',
    password: '',
    confirmpassword: ''
  }

  const validationSchema: Yup.ObjectSchema<UserVars> = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required")
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    confirmpassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Please make sure your passwords match."
      )
    })
  })

  const onSubmit = (values: UserVars, { resetForm }: any) => {
    const newUser = {
      username: values.username,
      password: md5(values.password),
      confirmpassword: md5(values.confirmpassword)
    }

    const index = userData.findIndex((val: UserVars) => val.username === values.username);
    if (index === -1) {
      dispatch(addUser(newUser));
      resetForm();
      dispatch(toSignup())
    } else if (index > -1) {
      setInvalid(true)
      resetForm();
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}>

        {formik => (
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange} />
              {formik.touched.username && formik.errors.username ? (
                <div style={{ color: "red" }}>{formik.errors.username}</div>
              ) : null}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange} />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
            </div>

            <div>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={formik.values.confirmpassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange} />
              {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                <div>{formik.errors.confirmpassword}</div>
              ) : null}
            </div>

            <button type="submit">Sign Up</button>
          </form>
        )}
      </Formik>
      {!invalid ? '' : <p className="message">Already Exist</p>}
      <button onClick={() => dispatch(toSignup())}>Log In</button>
    </>
  )
}

export default SignUp;