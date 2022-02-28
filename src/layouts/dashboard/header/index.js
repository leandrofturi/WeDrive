// @mui
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Tooltip } from '@mui/material';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import {
  DASHBOARD_HEADER_MOBILE,
  DASHBOARD_HEADER_DESKTOP,
} from '../../../config';
// paths
import { PATH_COMPANY } from '../../../paths';
//
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  ...cssStyles(theme).bgBlur(),
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.shorter,
  })
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: DASHBOARD_HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5),
    minHeight: DASHBOARD_HEADER_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

export default function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <RootStyle >
      <ToolbarStyle>
        <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />

        {window.location.pathname.startsWith('/company') &&
          <Box sx={{ px: 3 }}>
            {!window.location.pathname.endsWith('dashboard') &&
              <Tooltip title="Dashboard">
                <IconButtonAnimate onClick={() => { navigate(PATH_COMPANY.dashboard) }}>
                  <Iconify icon="charm:chart-line" />
                </IconButtonAnimate>
              </Tooltip>
            }

            {!window.location.pathname.endsWith('list-users') &&
              <Tooltip title="Meus Colaboradores">
                <IconButtonAnimate onClick={() => { navigate(PATH_COMPANY.user.list) }}>
                  <Iconify icon="mdi-account-multiple" />
                </IconButtonAnimate>
              </Tooltip>
            }
          </Box>
        }

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <NotificationsPopover app={window.location.pathname.startsWith('/app')} />
          <AccountPopover app={window.location.pathname.startsWith('/app')} />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
