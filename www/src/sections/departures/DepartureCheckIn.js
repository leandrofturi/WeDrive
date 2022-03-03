import { useState } from 'react';
import QrReader from "react-qr-reader";
// @mui
import { Box, Card, Grid, Button, Typography, CardActions, CardContent } from '@mui/material';
// 
import Readed from './Readed';
//
import './styles.css';

// ----------------------------------------------------------------------

function sleep(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

export default function DepartureCheckIn({ departure, setCancel }) {
  const [data, setData] = useState();
  const [scanned, setScanned] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const handleScan = async (scanned) => {
    if (scanned) {
      setData(scanned);
      console.log(scanned);
      console.log(data);
      setScanned(true);
      await sleep(500);
      setIsChecked(true);
    }
  }

  const handleError = (err) => {
    console.error(err)
  }

  return (
    <Card sx={{ py: 4, height: '50vw' }}>

      {!scanned ? (
        <>
          <CardContent >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Typography sx={{ py: 2 }} variant="h5" component="div" color="text.primary">
                  Aponte a câmera para o QR Code
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                <QrReader
                  className='qr-image-wrapper'
                  delay={500}
                  style={{
                    height: '70%',
                    width: '70%',
                  }}
                  onError={handleError}
                  onScan={handleScan}
                />
              </Grid>
            </Grid>
          </CardContent >

          <Box sx={{ px: 2, display: 'flex', justifyContent: 'center' }}>
            <CardActions>
              <Button color="inherit" size="small" onClick={() => setCancel?.(true)}>Cancelar</Button>
            </CardActions>
          </Box>
        </>
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography sx={{ py: 2 }} variant="h5" component="div" color="text.primary">
              Tudo certo!
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Readed isChecked={isChecked} />
          </Grid>
        </Grid>
      )}

    </Card>
  );
}
