import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Menu, MenuItem, IconButton } from '@mui/material';
// routes
import { PATH_COMPANY } from '../../../paths';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  id: PropTypes.string,
};

export default function UserMoreMenu({ onDelete, id }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { px: 1, width: 200, color: 'text.secondary' },
        }}
      >
        <MenuItem onClick={onDelete} sx={{ borderRadius: 1, typography: 'body2' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2, width: 24, height: 24 }} />
          Excluir
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={`${PATH_COMPANY.root}/${id}/edit-user`}
          sx={{ borderRadius: 1, typography: 'body2' }}
        >
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2, width: 24, height: 24 }} />
          Editar
        </MenuItem>
      </Menu>
    </>
  );
}
