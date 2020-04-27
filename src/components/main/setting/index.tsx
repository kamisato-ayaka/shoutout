import React from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../redux/actions'
import { Button } from '../../styles';

const Setting = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const toLogout = () => {
    dispatch(logoutUser())
    history.replace("/login")
  }

  return (
    <Button onClick={() => toLogout()}>Log Out</Button>
  )
}

export default Setting