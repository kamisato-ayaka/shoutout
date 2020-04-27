import React from 'react'
import { Link } from "react-router-dom";
import PostForm from '../post-form';
import PostList from '../post-list';
import Setting from '../setting';
import { useSelector } from 'react-redux';

import { AppState } from '../../../redux/types';
import Search from '../search';
import { Dboard, Header, Logo, Button, FormInvalid, H2Feed } from '../../styles';

const Dashboard = () => {

  const userName = useSelector((state: AppState) => state.logUserReducer)

  const logo = require('../../../images/logo-s.svg');

  return (
    <Dboard>
      <Header>
        <Logo>
          <Link to="/dashboard"><img src={logo} alt=""></img></Link>
        </Logo>
        <Search />
      </Header>

      {(userName === '') ?
        <>
          <FormInvalid>You must log in to view the page.</FormInvalid>
          <Link to="/login"><Button>Login</Button></Link>
          <Link to="/signup"><Button>Sign Up</Button></Link>
        </> :
        <div>
          <PostForm />

          <H2Feed>Recent</H2Feed>
          <PostList />
          <Setting />
        </div>
      }
    </Dboard>
  )
}

export default Dashboard