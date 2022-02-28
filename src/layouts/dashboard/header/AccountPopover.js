import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, MenuItem, Typography, Stack } from '@mui/material';
// routes
import { PATH_APP, PATH_COMPANY } from '../../../paths';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Dashboard',
    linkTo: PATH_COMPANY.dashboard,
    icon: "charm:chart-line"
  },
  {
    label: 'Conta',
    linkTo: PATH_COMPANY.user.account,
    icon: "mdi:account"
  },
];

const MENU_OPTIONS_APP = [
  {
    label: 'Partidas',
    linkTo: PATH_APP.departures,
    icon: "mdi-bus"
  },
  {
    label: 'Conta',
    linkTo: PATH_APP.user.account,
    icon: "mdi:account"
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover({ app }) {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const { user, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout?.();
      navigate('/');
      handleClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButtonAnimate
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider />
        <Stack spacing={0.5} sx={{ p: 1 }}>
          {(app ? MENU_OPTIONS_APP : MENU_OPTIONS).map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2, borderRadius: 1 }}
            >
              <Box
                component={Iconify}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{ color: 'error.main', typography: 'body2', py: 1, px: 2, borderRadius: 1, m: 1 }}
        >
          <Box
            component={Iconify}
            icon={'mdi:logout'}
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />
          Sair
        </MenuItem>
      </MenuPopover>
    </>
  );
}
