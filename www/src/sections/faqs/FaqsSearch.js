import { useState, useEffect } from 'react';
// @mui
import { Box, Grid, Card, Button, Typography, CardActions, CardContent } from '@mui/material';
// _mock
import { _faqs } from '../../_mock/_faqs';

export default function FaqsSearch({ input }) {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    setFaqs(_faqs.filter(e => Object.values(e).join().includes(input)).slice(0, 8));
  }, [input]);

  if (!faqs || faqs.length === 0) {
    return <div />
  }

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      sx={{ pb: 8 }}
    >
      {
        faqs.map(e => (
          <Grid item key={e.id}>
            <Card sx={{ width: 275, height: 240 }}>
              <CardContent sx={{ textOverflow: 'ellipsis' }}>
                <Typography variant="h5" component="div">
                  {e.heading}
                </Typography>
                <Box component="div" sx={{ textOverflow: 'ellipsis' }}>
                  <Typography variant="body2" sx={{ pt: 2 }} color="text.secondary">
                    {e.detail.length > 120 ? `${e.detail.slice(0, 120)}...` : e.detail}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions >
                <Box sx={{ pl: 2, pb: 2 }}>
                  <Button size="small">Leia mais</Button>
                </Box>
              </CardActions>
            </Card >
          </Grid>
        ))
      }
    </Grid>
  );
}