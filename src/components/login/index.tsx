import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/actions'
import * as Yup from 'yup'
import { Formik } from 'formik'
import md5 from 'md5'
import { LoginVars } from './types'
import { UserVars } from '../signup/types'
import { AppState } from '../../redux/types'
import {
  FormDiv,
  Box,
  FormLogo,
  FormGroup,
  FormTextDiv,
  FormText,
  FormInvalid,
  ButtonDiv,
  Button,
  P,
  BoldP
} from '../styles';

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
      history.push("/dashboard")

    } else if (user === -1) {
      setInvalid(true)
      resetForm()
    }
  }

  const signUp = () => {
    history.push("/signup")
    setInvalid(false)
  }

  const logo = require('../../images/logo-l.svg');

  return (
    <FormDiv>
      <Box>
        <FormLogo>
          <img src={logo} alt=""></img>
        </FormLogo>

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
                  <FormGroup>
                    <P>Username</P>
                    <input
                      type="input"
                      className="form-field"
                      name="username"
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <FormInvalid>{formik.errors.username}</FormInvalid>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <P>Password</P>
                    <input
                      type="password"
                      className="form-field"
                      name="password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <FormInvalid>{formik.errors.password}</FormInvalid>
                    ) : null}
                  </FormGroup>
                  <ButtonDiv>
                    <Button type="submit">Log In</Button>
                  </ButtonDiv>
                </form>
              </>
            )
          }
        </Formik>
        {!invalid ? '' : <FormInvalid className="message">Account doesn't exist.</FormInvalid>}
        <FormTextDiv>
          <FormText onClick={() => signUp()}>Don't have an account? <BoldP>Sign Up</BoldP></FormText>
        </FormTextDiv>
      </Box >
    </FormDiv>
  )
}

export default Login