import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// @mui
import { LoadingButton } from '@mui/lab';
import MuiPhoneNumber from "material-ui-phone-number";
import { Box, Grid, Card, Divider, TextField, Typography, FormHelperText } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import UploadAvatar from '../../components/UploadAvatar';
// utils
import { fData } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

if (!Date.now) {
  Date.now = () => new Date().getTime();
}

function sleep(delay) {
  return new Promise(res => setTimeout(res, delay));
}

export default function AccountGeneral({ isCompany }) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, update } = useAuth();

  /* eslint-disable no-useless-escape */
  const UpdateUserSchema = Yup.object().shape({
    given_name: Yup.string().required('O nome é obrigatório'),
    family_name: Yup.string().required('O sobrenome é obrigatório'),
    email: Yup.string().required('O e-mail é obrigatório ').email()
  });
  /* eslint-enable no-useless-escape */

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nickname: user?.nickname || '',
      given_name: user?.given_name || '',
      family_name: user?.family_name || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
      street: user?.street || '',
      number: user?.number || '',
      complement: user?.complement || '',
      district: user?.district || '',
      state: user?.state || '',
      picture: user?.picture || '',
      nameCompany: user?.nameCompany || '',
      emailCompany: user?.emailCompany || '',
      phone_numberCompany: user?.phone_numberCompany || '',
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        console.log(values);
        await sleep(2000);
        await update?.(values);
        enqueueSnackbar('Usuário atualizado', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          enqueueSnackbar(error.error, { variant: 'error' });
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    },
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

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
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <>
                <UploadAvatar
                  accept="image/*"
                  file={values.photoURL}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.picture && errors.picture)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mb: 4,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Permitidos *.jpeg, *.jpg, *.png, *.gif
                      <br /> com tamanho máximo de {fData(3145728)}
                    </Typography>
                  }
                />

                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.picture && errors.picture}
                </FormHelperText>

                <TextField fullWidth label="Apelido" {...getFieldProps('nickname')} sx={{ paddingBottom: 2 }} />
              </>

            </Card>
          </Grid>

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
                </Grid>

                <Grid item xs={12} md={12} sx={{ paddingTop: 2 }}>
                  <Divider orientation='horizontal' flexItem sx={{ borderStyle: 'dashed' }} />
                </Grid>

                {isCompany ?
                  (
                    <>
                      <Grid item xs={12} md={12}>
                        <Typography variant="body1" sx={{ pt: 2 }} color='text.disabled'>
                          Dados da Empresa
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          label="Razão Social"
                          {...getFieldProps('nameCompany')}
                          error={Boolean(touched.nameCompany && errors.nameCompany)}
                          helperText={touched.nameCompany && errors.nameCompany}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="E-mail"
                          {...getFieldProps('emailCompany')}
                          error={Boolean(touched.emailCompany && errors.emailCompany)}
                          helperText={touched.emailCompany && errors.emailCompany}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                      </Grid>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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
