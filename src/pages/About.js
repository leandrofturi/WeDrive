// @mui
import { Divider } from '@mui/material';
// components
import Page from '../components/Page';
import { AboutHero, AboutTeam } from '../sections/about';

// ----------------------------------------------------------------------

export default function About() {
  return (
    <Page title="Sobre nós">
        <AboutHero />

        <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

        <AboutTeam />

    </Page>
  );
}
