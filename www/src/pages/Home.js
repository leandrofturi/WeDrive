// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import HomeHero from '../sections/home/HomeHero';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%'
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="WeDrive">
      <RootStyle>
        <HomeHero />
      </RootStyle>
    </Page>
  );
}
