// @mui
import { Container } from '@mui/material';
// routes
import { PATH_APP } from '../paths';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import AccountGeneral from '../sections/user/AccountGeneral';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Conta">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Conta"
          links={[
            { name: 'Partidas', href: PATH_APP.departures },
            { name: 'Conta', href: PATH_APP.user.account },
          ]}
        />

        <AccountGeneral />

      </Container>
    </Page>
  );
}
