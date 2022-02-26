import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { DepartureCard, DepartureMap } from '../sections/departures';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Departures() {
  const [openMap, setOpenMap] = useState();

  return (
    <Page title="Partidas">
      <RootStyle>
        <Container sx={{ my: 10 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <DepartureCard setOpenMap={setOpenMap} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DepartureMap openMap={openMap} />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
