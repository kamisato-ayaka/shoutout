import React from 'react'
import { useDispatch } from 'react-redux'
import { toLogin, resetUser } from '../../../redux/actions'

const Setting = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => {
        dispatch(toLogin())
        dispatch(resetUser())
      }}>Log Out</button>
    </>
  )
}

export default Setting