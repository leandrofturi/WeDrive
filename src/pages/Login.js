import React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import LoginForm from '../sections/LoginForm';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '80vh',
  flexDirection: 'column',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

class Login extends React.Component {
  render() {
    return (
      <Page title="Login">
        <Container maxWidth="sm">
          <ContentStyle>
            <LoginForm />
          </ContentStyle>
        </Container>
      </Page>
    );
  }
}

export default Login