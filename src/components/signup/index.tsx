import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/actions';
import * as Yup from 'yup'
import { Formik } from 'formik'
import md5 from 'md5';
import { UserVars } from './types';
import { AppState } from '../../redux/types';
import {
  FormDiv,
  Box,
  FormLogo,
  FormGroup,
  FormText,
  FormInvalid,
  ButtonDiv,
  Button,
  P,
  BoldP,
  FormTextDiv
} from '../styles';

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const userData: UserVars[] = useSelector((state: AppState) => state.signupReducer)

  const [invalid, setInvalid] = useState<boolean>(false)

  const initialValues: Omit<UserVars, "following" | "followers"> | null = {
    username: '',
    password: '',
    confirmpassword: '',
  }

  const validationSchema: Yup.ObjectSchema<Omit<UserVars, "following" | "followers">> = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required")
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    confirmpassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Please make sure your passwords match."
      )
    }),
  })

  const onSubmit = (values: Omit<UserVars, "following" | "followers">, { resetForm }: any) => {
    const newUser = {
      username: values.username,
      password: md5(values.password),
      confirmpassword: md5(values.confirmpassword),
      following: [],
      followers: []
    }

    const index = userData.findIndex((val: UserVars) => val.username === values.username);

    if (index === -1) {
      dispatch(addUser(newUser));
      resetForm();
      history.push("/login")

    } else if (index > -1) {
      setInvalid(true)
      resetForm();
    }
  }

  const logIn = () => {
    history.push("/login")
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

          {formik => (
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <FormGroup>
                <P>Username</P>
                <input
                  type="text"
                  name="username"
                  className="form-field"
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange} />
                {formik.touched.username && formik.errors.username ? (
                  <FormInvalid>{formik.errors.username}</FormInvalid>
                ) : null}
              </FormGroup>

              <FormGroup>
                <P>Password</P>
                <input
                  type="password"
                  name="password"
                  className="form-field"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange} />
                {formik.touched.password && formik.errors.password ? (
                  <FormInvalid>{formik.errors.password}</FormInvalid>
                ) : null}
              </FormGroup>

              <FormGroup>
                <P>Confirm Password</P>
                <input
                  type="password"
                  name="confirmpassword"
                  className="form-field"
                  value={formik.values.confirmpassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange} />
                {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                  <FormInvalid>{formik.errors.confirmpassword}</FormInvalid>
                ) : null}
              </FormGroup>

              <ButtonDiv>
                <Button type="submit">Sign Up</Button>
              </ButtonDiv>
            </form>
          )}
        </Formik>
        {!invalid ? '' : <FormInvalid className="message">Account already exist.</FormInvalid>}
        
        <FormTextDiv>
          <FormText onClick={() => logIn()}>Already have an account? <BoldP>Log In</BoldP></FormText>
        </FormTextDiv>
      </Box>
    </FormDiv>
  )
}

export default SignUp;