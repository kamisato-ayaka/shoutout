import React from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { resetUser, logoutUser } from '../../../redux/actions'

const Setting = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const toLogout = () => {
    dispatch(resetUser())
    dispatch(logoutUser())
    history.replace("/login")
  }

  return (
    <>
      <button onClick={() => toLogout()}>Log Out</button>
    </>
  )
}

export default Setting