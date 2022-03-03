import { useState } from 'react';
import ptBR from 'date-fns/locale/pt-BR';
import { format, formatDistanceToNow } from 'date-fns';
// @mui
import { styled } from '@mui/material/styles';
import {
  Grid,
  Card,
  Step,
  Stack,
  Button,
  Stepper,
  Divider,
  StepLabel,
  Typography,
  StepContent,
  CardActions,
  CardContent,
} from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import { MotionInView, varFade } from '../../components/animate';
// _mock
import { _departures } from '../../_mock';

const LibStepIconRoot = styled('div')(({ theme }) => ({
  padding: 6,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: theme.palette.grey[300],
}));

function LibStepIcon(props) {
  const icons = {
    1: <Iconify icon="mdi-bus" width={24} height={24} />,
    2: <Iconify icon="eva:pin-fill" width={29} height={24} />,
  };

  return (
    <LibStepIconRoot >
      {icons[String(props.icon)]}
    </LibStepIconRoot>
  );
}

// ----------------------------------------------------------------------

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function DepartureCard({ setOpenMap, setCheckIn }) {
  const [open, setOpen] = useState(false);

  return (
    <Stack spacing={5}>
      <MotionInView variants={varFade().inUp}>
        <Typography variant="h3">
          Partidas
        </Typography>
      </MotionInView>

      <Stack spacing={3}>
        {_departures.map((departure, i) => (
          <MotionInView variants={varFade().inUp} key={`departure_${i}`} >
            <Card sx={{ minWidth: 275 }} >
              <CardContent>
                <Grid
                  container
                  spacing={0.5}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Button sx={{ ml: -2, px: 2 }} size="small" variant="text" color="secondary"
                      onClick={() => {
                        setOpen(i);
                      }}>
                      <Typography variant="h5" component="div" color={departure.to.time > new Date() ? "text.primary" : "text.disabled"}>
                        {departure.to.time > new Date() ? "Próxima Viagem" : "Viagem realizada"}
                      </Typography>
                    </Button>

                  </Grid>
                  <Grid item>
                    <Typography variant="caption" color={departure.to.time > new Date() ? "text.secondary" : "text.disabled"}>
                      {Capitalize(formatDistanceToNow(departure.to.time, { addSuffix: true, locale: ptBR }))}
                    </Typography>
                  </Grid>
                </Grid>

                <Typography sx={{ mb: 1.5 }} color={departure.to.time > new Date() ? "text.secondary" : "text.disabled"}>
                  {format(departure.to.time, "dd MMM yyyy à's' HH:mm", { locale: ptBR })}
                </Typography>

                <Button sx={{ ml: -2, px: 2 }} size="small" variant="text" color="secondary"
                  onClick={() => {
                    setOpenMap?.(departure.to);
                  }}>
                  <Typography variant="body2" color={departure.to.time > new Date() ? "text.secondary" : "text.disabled"}>
                    {departure.to.address}
                  </Typography>
                </Button>

                {open === i && (
                  <>
                    <Divider sx={{ my: 1.5 }} />
                    <Stepper activeStep={0} orientation="vertical">
                      <Step active >

                        <StepLabel StepIconComponent={LibStepIcon}>
                          <Typography variant="subtitle2" color="#454F5B" >
                            Embarque
                          </Typography>
                        </StepLabel>

                        <StepContent>
                          <Typography variant="body1" color="text.primary" >
                            <strong>{_departures[open].from.address}</strong >
                          </Typography>

                          <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary" >
                            {format(_departures[open].from.time, "dd MMM yyyy à's' HH:mm", { locale: ptBR })}
                          </Typography>
                        </StepContent>
                      </Step>

                      <Step active >
                        <StepLabel StepIconComponent={LibStepIcon}>
                          <Typography variant="subtitle2" color="#454F5B" >
                            Desembarque
                          </Typography>
                        </StepLabel>
                        <StepContent>
                          <Typography variant="body1" color="text.primary" >
                            <strong>{_departures[open].to.address}</strong >
                          </Typography>

                          <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary" >
                            {format(_departures[open].to.time, "dd MMM yyyy à's' HH:mm", { locale: ptBR })}
                          </Typography>
                        </StepContent>
                      </Step>

                    </Stepper>
                  </>
                )}

              </CardContent>
              <CardActions>

                <Grid
                  container
                  spacing={0.5}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid
                      container
                      spacing={0.5}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item>
                        <Button disabled={departure.to.time < new Date()} size="small" variant="contained" color="primary" sx={{ mb: 1.5, ml: 1.5 }}
                          onClick={() => { setCheckIn(departure); setOpen(i) }}>
                          Check-in
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button disabled={departure.to.time < new Date()} size="small" variant="contained" color="inherit" sx={{ mb: 1.5, ml: 1.5 }}>
                          Cancelar
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item >
                    <Button size="small" variant="outlined" color="primary" sx={{ mb: 1.5, mr: 1.5 }} endIcon={open === i ? <Iconify icon="mdi-menu-up" /> : <Iconify icon="mdi-menu-down" />}
                      onClick={() => { open === i ? setOpen(null) : setOpen(i); setOpenMap?.(_departures[i].to) }}>
                      Detalhes
                    </Button>
                  </Grid>
                </Grid>

              </CardActions>
            </Card>
          </MotionInView>
        ))}
      </Stack>
    </Stack >
  );
}
