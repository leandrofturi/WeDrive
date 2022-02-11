import React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import RegisterForm from '../sections/RegisterForm';

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

class Register extends React.Component {
  render() {
    return (
      <Page title="Register">
        <Container maxWidth="sm">
          <ContentStyle>
            <RegisterForm />
          </ContentStyle>
        </Container>
      </Page>
    );
  }
}

export default Register