import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  margin: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(https://minimal-assets-api.vercel.app/assets/overlay.svg), url(/assets/ufes.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 660,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  return (
    <MotionContainer>
      <RootStyle>
        <Container sx={{ position: 'relative', height: '100%' }}>
          <ContentStyle>
            <TextAnimate text="Quem" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
            <br />
            <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
              <TextAnimate text="somos?" />
            </Box>

            <m.div variants={varFade().inRight}>
              <Typography
                variant="h4"
                sx={{
                  mt: 5,
                  color: 'common.white',
                  fontWeight: 'fontWeightMedium',
                }}
              >
                Estudantes da Ufes movidos por um motivo:
                <br /> ser aprovado em Projet~ao
              </Typography>
            </m.div>
          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}
