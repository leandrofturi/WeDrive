import MapGL from 'react-map-gl';
import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { varFade, MotionContainer } from '../components/animate';
import { MapControlPopup, MapControlMarker, MapControlScale, MapControlNavigation } from '../components/map';
// config
import { MAPBOX_API, MAIN_HEADER_DESKTOP, MAIN_HEADER_MOBILE } from '../config';
//
import 'mapbox-gl/dist/mapbox-gl.css';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  margin: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(https://minimal-assets-api.vercel.app/assets/overlay.svg), url(/assets/ufes.jpg)',
  height: '100vh',
  padding: 0,
  marginTop: -MAIN_HEADER_MOBILE,
  [theme.breakpoints.up('xs')]: {
    marginTop: -MAIN_HEADER_DESKTOP
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  paddingTop: MAIN_HEADER_MOBILE,
  [theme.breakpoints.up('xs')]: {
    paddingTop: MAIN_HEADER_DESKTOP + MAIN_HEADER_DESKTOP
  },
}));

// ----------------------------------------------------------------------

export default function Contact() {
  return (
    <Page title="Contate-nos">
      <MotionContainer>
        <RootStyle>

          <ContactMap />

          <Container>
            <ContentStyle>
              <m.div variants={varFade().inRight}>
                <Typography variant="h3" sx={{ color: 'common.white', fontWeight: 'fontWeightMedium', }}>
                  Venha tomar um
                  <Typography display="inline" component="span" variant="h3" sx={{ color: 'primary.main', fontWeight: 'fontWeightMedium', }}>
                    {" café "}
                  </Typography>
                  conosco!
                </Typography>
              </m.div>

              <m.div variants={varFade().inRight}>
                <Typography variant="body1" sx={{ color: 'common.white', paddingTop: 4 }}>
                  Av. Fernando Ferrari, 514 - Goiabeiras, Vitória - ES
                </Typography>

                <Typography variant="body1" sx={{ color: 'common.white', paddingTop: 1 }}>
                  email@email.com.br
                </Typography>
              </m.div>

            </ContentStyle>
          </Container>
        </RootStyle>
      </MotionContainer>
    </Page >
  );
}

// ----------------------------------------------------------------------

const RootMapStyle = styled('div')(({ theme }) => ({
  top: 40,
  right: 0,
  bottom: 0,
  zIndex: 0,
  height: 0,
  width: 0,
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    height: '60vh',
    width: '80vh',
  },
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

function ContactMap() {
  const [tooltip, setTooltip] = useState(null);

  return (
    <RootMapStyle>
      <MapGL
        latitude={-20.2770}
        longitude={-40.3047}
        zoom={12}
        mapStyle={`mapbox://styles/mapbox/dark-v10`}
        mapboxAccessToken={MAPBOX_API}
        width="100%"
        height="100%"
      >
        <MapControlScale />
        <MapControlNavigation />

        <MapControlMarker
          latitude={-20.2770}
          longitude={-40.3047}
          onClick={() => setTooltip(true)}
        />
        ))

        {tooltip && (
          <MapControlPopup
            latitude={-20.2770}
            longitude={-40.3047}
            onClose={() => setTooltip(null)}
            sx={{
              '& .mapboxgl-popup-content': { bgcolor: 'common.white' },
              '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': { borderTopColor: '#FFF' },
              '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': { borderBottomColor: '#FFF' },
            }}
          >
            <Typography component="p" variant="caption">
              Av. Fernando Ferrari, 514 - Goiabeiras, Vitória - ES
            </Typography>
          </MapControlPopup>
        )}
      </MapGL>
    </RootMapStyle>
  );
}
