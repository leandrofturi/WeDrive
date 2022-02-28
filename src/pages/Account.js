import { useState } from 'react';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_COMPANY } from '../paths';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import AccountGeneral from '../sections/user/AccountGeneral';
import AccountNotifications from '../sections/user/AccountNotifications';

// ----------------------------------------------------------------------

export default function Account() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('conta');

  const ACCOUNT_TABS = [
    {
      value: 'conta',
      label: 'Dados pessoais',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral isCompany={window.location.pathname.startsWith('/company')} />,
    },
    {
      value: 'notificacoes',
      label: 'Notificações',
      icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
      component: <AccountNotifications />,
    }
  ];

  return (
    <Page title="Dados pessoais">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Dados pessoais"
          links={[
            { name: 'Dashboard', href: PATH_COMPANY.dashboard },
            { name: 'Dados pessoais', href: PATH_COMPANY.user.account },
            { name: 'Configurações' },
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
