import React from 'react'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PostForm from '../post-form';
import PostList from '../post-list';
import Setting from '../setting';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../../redux/actions';
import { AppState } from '../../../redux/types';
import Search from '../search';

const Dashboard = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const userName = useSelector((state: AppState) => state.logUserReducer)

  const toProfile = () => {
    history.push(`/${userName}`)
    dispatch(getUser(userName))
  }

  return (
    <>
      <h1>Shoutout</h1>

      {(userName === '') ?
        <>
          <p>You must log in to view the page.</p>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/signup"><button>Sign Up</button></Link>
        </> :
        <>
          <Link to="/dashboard"><h3>Home</h3></Link>
          <p onClick={() => toProfile()}>Hi, {userName}</p>
          <Search />
          <PostForm />
          <PostList />
          <Setting />
        </>
      }
    </>
  )
}

export default Dashboard