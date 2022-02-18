import { useState } from 'react';
// @mui
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { FaqsHero, FaqsList, FaqsForm, FaqsSearch } from '../sections/faqs';
// ----------------------------------------------------------------------

export default function FAQs() {
  const [input, setInput] = useState('');

  return (
    <Page title="Faqs">
      <FaqsHero onChange={setInput} />

      <Container sx={{ mt: 15, mb: 10 }}>

        {input !== '' && <FaqsSearch input={input} />}

        <Typography variant="h3" sx={{ mb: 5 }}>
          Perguntas frequentes
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <FaqsList />
          </Grid>
          <Grid item xs={12} md={6}>
            <FaqsForm />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
