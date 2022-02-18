// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
//
import { varFade, MotionInView } from '../../components/animate';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  return (
    <Stack spacing={3}>
      <MotionInView variants={varFade().inUp}>
        <Typography variant="h4">Não encontrou a ajuda que procurava?</Typography>
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <TextField fullWidth label="Nome" />
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <TextField fullWidth label="E-mail" />
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <TextField fullWidth label="Assunto" />
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <TextField fullWidth label="Insira sua mensagem aqui." multiline rows={4} />
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Submeter
        </Button>
      </MotionInView>
    </Stack>
  );
}
