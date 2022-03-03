import { useLocation, Outlet } from 'react-router-dom';
// @mui
import { Box, Container, Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = !pathname.startsWith('/auth') && !pathname.startsWith('/company') && !pathname.startsWith('/app');

  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      {isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container>
            <Logo sx={{ mb: 1, mx: 'auto' }} />

            <Typography variant="caption" component="p">
              © 2022. Todos os direitos reservados
            </Typography>
          </Container>
        </Box>
      )}
    </Stack>
  );
}
