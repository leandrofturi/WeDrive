// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Button, Container, Tooltip, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// hooks
import useAuth from '../hooks/useAuth';
// sections
import {
  AppCost,
  AppTimeline,
  AppTimeDuration,
  AppWidgetSummary,
  AppCurrentBalance
} from '../sections/app';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <Page title="Relatórios">
      <Container maxWidth='xl'>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" sx={{ mt: -10, pl: 4 }}>
              Relatórios
            </Typography>

            {user.companyName &&
              <Typography variant="h3" sx={{ mb: 5, pl: 4 }}>
                {user.companyName}
              </Typography>
            }

          </Grid>

          <Grid item>
            <Tooltip title="Em Breve">
              <Button variant="outlined" size="large" startIcon={<Iconify icon="bi:stars" />} sx={{ mb: 5, mt: -10 }}>
                Obter insights
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container spacing={3}>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Funcionários ativos"
              percent={2.6}
              total={48}
              chartColor={theme.palette.success.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Funcionários Inativos"
              percent={-0.1}
              total={7}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Solicitações"
              percent={0.2}
              total={76}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTimeDuration />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppCost />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentBalance />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
