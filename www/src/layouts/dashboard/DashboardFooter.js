// @mui
import { styled } from '@mui/material/styles';
import { Box, Divider, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------


const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container sx={{ pt: 3 }}>
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container>
            <Typography variant="caption" component="p" >
              WeDrive
            </Typography>

            <Typography variant="caption" component="p">
              © 2022. Todos os direitos reservados
            </Typography>
          </Container>
        </Box>
      </Container>
    </RootStyle>
  );
}
