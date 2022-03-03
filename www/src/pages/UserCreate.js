import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_COMPANY } from '../paths';
// hooks
import useSettings from '../hooks/useSettings';
// _mock_
import { _userList } from '../_mock';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import UserNewForm from '../sections/user/UserNewForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const isEdit = pathname.includes('edit');

  const currentUser = _userList.find((user) => user.id === id);

  return (
    <Page title="Novo Colaborador">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Novo colaborador' : 'Editar Colaborador'}
          links={[
            { name: 'Dashboard', href: PATH_COMPANY.dashboard },
            { name: 'Colaboradores', href: PATH_COMPANY.user.list },
            { name: !isEdit ? 'Novo Colaborador' : currentUser?.name },
          ]}
        />

        <UserNewForm isEdit={isEdit} user={currentUser} />
      </Container>
    </Page>
  );
}
