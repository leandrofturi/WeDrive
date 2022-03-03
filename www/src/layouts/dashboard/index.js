import { Outlet } from 'react-router-dom';
// @mui
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// config
import {
  DASHBOARD_HEADER_MOBILE,
  DASHBOARD_HEADER_DESKTOP,
} from '../../config';
//
import DashboardHeader from './header';
import DashboardFooter from './DashboardFooter';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    minHeight: '100%',
  },
}));

const MainStyle = styled('main')(({ theme }) => ({
  flexGrow: 1,
  paddingTop: DASHBOARD_HEADER_MOBILE + 24,
  paddingBottom: DASHBOARD_HEADER_MOBILE + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: DASHBOARD_HEADER_DESKTOP + 24,
    paddingBottom: DASHBOARD_HEADER_DESKTOP + 24
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  return (
    <Stack sx={{ minHeight: 1 }}>
      <RootStyle>
        <DashboardHeader />

        <MainStyle >
          <Outlet />
        </MainStyle>

        <Box sx={{ flexGrow: 1 }} />
      </RootStyle>

      <DashboardFooter />
    </Stack>
  );
}
