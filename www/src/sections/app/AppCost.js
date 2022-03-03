import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Typography, Stack, LinearProgress } from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
// _mock_
import { _appCost } from '../../_mock';

// ----------------------------------------------------------------------

export default function AppCost() {
  return (
    <Card>
      <CardHeader title="Custos atuais" />
      <Stack spacing={4} sx={{ p: 3 }}>
        {_appCost.map((progress) => (
          <ProgressItem key={progress.label} progress={progress} />
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    amount: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.number,
  }),
};

function ProgressItem({ progress }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>
        <Typography variant="subtitle2">{fCurrency(progress.amount)}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({`${progress.value}%`})
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress.value}
        color={
          (progress.label === 'Impostos' && 'warning') ||
          'primary'
        }
      />
    </Stack>
  );
}
