import MapGL from 'react-map-gl';
import { useState, useEffect } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// config
import { MAPBOX_API } from '../../config';
// components
import { MapControlPopup, MapControlMarker, MapControlScale, MapControlNavigation } from '../../components/map';
//
import 'mapbox-gl/dist/mapbox-gl.css';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  top: 40,
  right: 0,
  bottom: 0,
  zIndex: 0,
  margin: 'auto',
  height: '60vh',
  width: '80vh',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
  },
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

export default function DepartureMap({ openMap }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [tooltip, setTooltip] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: -20.2770,
    longitude: -40.3047,
    zoom: 12,
  });
  const [current, setCurrent] = useState({
    latlng: [-20.2770, -40.3047],
    address: "Av. Fernando Ferrari, 514 - Goiabeiras, Vitória - ES"
  })

  useEffect((() => {
    if (openMap) {
      setCurrent(openMap);
      setViewport({
        latitude: openMap.latlng?.[0],
        longitude: openMap.latlng?.[1],
        zoom: 12,
      })
    }
  }), [openMap])

  return (
    <RootStyle>
      <MapGL
        {...viewport}
        onViewportChange={setViewport}
        mapStyle={`mapbox://styles/mapbox/${isLight ? 'light' : 'dark'}-v10`}
        mapboxAccessToken={MAPBOX_API}
        width="100%"
        height="100%"
      >
        <MapControlScale />
        <MapControlNavigation />

        <MapControlMarker
          latitude={current.latlng[0]}
          longitude={current.latlng[1]}
          onClick={() => setTooltip(current)}
        />
        ))

        {tooltip && (
          <MapControlPopup
            latitude={tooltip.latlng[0]}
            longitude={tooltip.latlng[1]}
            onClose={() => setTooltip(null)}
            sx={{
              '& .mapboxgl-popup-content': { bgcolor: 'common.white' },
              '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': { borderTopColor: '#FFF' },
              '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': { borderBottomColor: '#FFF' },
            }}
          >
            <Typography component="p" variant="caption">
              {tooltip.address}
            </Typography>
          </MapControlPopup>
        )}
      </MapGL>
    </RootStyle>
  );
}
