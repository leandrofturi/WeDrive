// @mui
import { styled } from '@mui/material/styles';
import { Button, Card, Typography, Stack } from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const RowStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

// ----------------------------------------------------------------------

export default function AppCurrentBalance() {
  const currentBalance = 602.54;
  const sentAmount = 142.20;
  const totalAmount = currentBalance - sentAmount;

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        Custos atuais
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h3">{fCurrency(totalAmount)}</Typography>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total de custos atuais
          </Typography>
          <Typography variant="body2">{fCurrency(currentBalance)}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Deduções fiscais
          </Typography>
          <Typography variant="body2">- {fCurrency(sentAmount)}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total
          </Typography>
          <Typography variant="subtitle1">{fCurrency(totalAmount)}</Typography>
        </RowStyle>

        <Stack direction="row" spacing={1.5}>
          <Button fullWidth variant="contained">
            Detalhes
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
