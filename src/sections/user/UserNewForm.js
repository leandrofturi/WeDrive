import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// @mui
import { LoadingButton } from '@mui/lab';
import MuiPhoneNumber from "material-ui-phone-number";
import { Box, Grid, Card, Divider, TextField } from '@mui/material';
//
import { PATH_DASHBOARD } from '../../paths';

// ----------------------------------------------------------------------

function sleep(delay) {
  return new Promise(res => setTimeout(res, delay));
}

export default function UserNewForm({ isEdit, user }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  /* eslint-disable no-useless-escape */
  const NewUserSchema = Yup.object().shape({
    given_name: Yup.string().required('O nome é obrigatório'),
    family_name: Yup.string().required('O sobrenome é obrigatório'),
    email: Yup.string().required('O e-mail é obrigatório ').email()
  });
  /* eslint-enable no-useless-escape */

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      given_name: user?.attributes?.given_name || '',
      family_name: user?.attributes?.family_name || '',
      email: user?.attributes?.email || '',
      phone_number: user?.attributes?.phone_number || '+5599999999999',
      street: user?.attributes?.street || '',
      number: user?.attributes?.number || '',
      complement: user?.attributes?.complement || '',
      district: user?.attributes?.district || '',
      state: user?.attributes?.state || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log(values);
        await sleep(2000);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Usuário criado' : 'Usuário atualizado', { variant: 'success' });
        navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  const STATES_LIST = [
    { key: 'ES', label: 'Espírito Santo' },
    { key: 'AC', label: 'Acre' },
    { key: 'AL', label: 'Alagoas' },
    { key: 'AP', label: 'Amapá' },
    { key: 'AM', label: 'Amazonas' },
    { key: 'BA', label: 'Bahia' },
    { key: 'CE', label: 'Ceará' },
    { key: 'GO', label: 'Goiás' },
    { key: 'MA', label: 'Maranhão' },
    { key: 'MT', label: 'Mato Grosso' },
    { key: 'MS', label: 'Mato Grosso do Sul' },
    { key: 'MG', label: 'Minas Gerais' },
    { key: 'PA', label: 'Pará' },
    { key: 'PB', label: 'Paraíba' },
    { key: 'PR', label: 'Paraná' },
    { key: 'PE', label: 'Pernambuco' },
    { key: 'PI', label: 'Piauí' },
    { key: 'RJ', label: 'Rio de Janeiro' },
    { key: 'RN', label: 'Rio Grande do Norte' },
    { key: 'RS', label: 'Rio Grande do Sul' },
    { key: 'RO', label: 'Rondônia' },
    { key: 'RR', label: 'Roraima' },
    { key: 'SC', label: 'Santa Catarina' },
    { key: 'SP', label: 'São Paulo' },
    { key: 'SE', label: 'Sergipe' },
    { key: 'TO', label: 'Tocantins' },
    { key: 'DF', label: 'Distrito Federal' },
  ];

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                rowSpacing={3}
                columnSpacing={2}
              >

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nome"
                    {...getFieldProps('given_name')}
                    error={Boolean(touched.given_name && errors.given_name)}
                    helperText={touched.given_name && errors.given_name}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Sobrenome"
                    {...getFieldProps('family_name')}
                    error={Boolean(touched.family_name && errors.family_name)}
                    helperText={touched.family_name && errors.family_name}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="E-mail"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <MuiPhoneNumber
                    fullWidth
                    label="Telefone"
                    variant="outlined"
                    onlyCountries={["br"]}
                    localization={{ Brazil: 'Brasil' }}
                    value={values.phone_number}
                    onChange={(value) => setFieldValue('phone_number', value.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', ''))}
                  />
                </Grid>

                <Grid item xs={12} md={12} sx={{ paddingTop: 2 }}>
                  <Divider orientation='horizontal' flexItem sx={{ borderStyle: 'dashed' }} />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField fullWidth label="Rua" {...getFieldProps('street')} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Número" {...getFieldProps('number')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Complemento" {...getFieldProps('complement')} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Bairro" {...getFieldProps('district')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Estado"
                    placeholder="Estado"
                    {...getFieldProps('state')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.district && errors.district)}
                    helperText={touched.district && errors.district}
                  >
                    <option value="" />
                    {STATES_LIST.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Salvar
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form >
    </FormikProvider >
  );
}
