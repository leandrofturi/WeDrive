import React from 'react';
// hooks
import useAuth from '../hooks/useAuth';
// components
import Page from '../components/Page';

export default function Home() {
  const { user } = useAuth();

  return (
    <Page title="Home">
      {`Bem vindo ${user.firstName}`}
    </Page>
  );
}