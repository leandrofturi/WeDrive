import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Card, Switch, Stack, Typography, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
//
import { _activity_options, _application_options } from '../../_mock';

// ----------------------------------------------------------------------

const NOTIFICATION_SETTINGS = {
  not1: true,
  not2: true,
  not3: false,
  not4: true,
  not5: false,
  not6: false,
};

// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      not1: NOTIFICATION_SETTINGS.not1,
      not2: NOTIFICATION_SETTINGS.not2,
      not3: NOTIFICATION_SETTINGS.not3,
      not4: NOTIFICATION_SETTINGS.not4,
      not5: NOTIFICATION_SETTINGS.not5,
      not6: NOTIFICATION_SETTINGS.not6,
    },
    onSubmit: async (values, { setSubmitting }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitting(false);
      enqueueSnackbar('Salvo', { variant: 'success' });
    },
  });

  const { values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <Stack spacing={2} sx={{ width: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Atividades
              </Typography>
              <Stack spacing={1} alignItems="flex-start">
                {_activity_options.map((activity) => (
                  <FormControlLabel
                    key={activity.key}
                    control={<Switch {...getFieldProps(activity.key)} checked={values[activity.key]} />}
                    label={activity.label}
                    sx={{ mx: 0 }}
                  />
                ))}
              </Stack>
            </Stack>

            <Stack spacing={2} sx={{ width: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Aplicação
              </Typography>
              <Stack spacing={1} alignItems="flex-start">
                {_application_options.map((item) => (
                  <FormControlLabel
                    key={item.key}
                    control={<Switch {...getFieldProps(item.key)} checked={values[item.key]} />}
                    label={item.label}
                    sx={{ mx: 0 }}
                  />
                ))}
              </Stack>
            </Stack>

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
