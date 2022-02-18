// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import HomeHero from '../sections/home/HomeHero';
// config
import { MAIN_HEADER_DESKTOP, MAIN_HEADER_MOBILE } from '../config';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  paddingTop: MAIN_HEADER_MOBILE,
  [theme.breakpoints.up('xs')]: {
    paddingTop: MAIN_HEADER_DESKTOP
  },
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="The starting point for your next project">
      <RootStyle>
        <HomeHero />
      </RootStyle>
    </Page>
  );
}
