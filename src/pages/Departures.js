import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { DepartureMap, DepartureCard, DepartureCheckIn } from '../sections/departures';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Departures() {
  const [checkIn, setCheckIn] = useState();
  const [openMap, setOpenMap] = useState();

  return (
    <Page title="Partidas">
      <RootStyle>
        <Container sx={{ my: 10 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <DepartureCard setOpenMap={setOpenMap} setCheckIn={setCheckIn} />
            </Grid>
            <Grid item xs={12} md={6}>
              {checkIn ?
                <DepartureCheckIn departure={checkIn} setCancel={() => setCheckIn(null)} /> :
                <DepartureMap openMap={openMap} />
              }
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
