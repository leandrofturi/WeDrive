import { useState } from 'react';
// @mui
import { Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { DepartureMap, DepartureCard, DepartureCheckIn } from '../sections/departures';

// ----------------------------------------------------------------------

export default function Departures() {
  const [checkIn, setCheckIn] = useState();
  const [openMap, setOpenMap] = useState();

  return (
    <Page title="Partidas">
      <Container >
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
    </Page>
  );
}
