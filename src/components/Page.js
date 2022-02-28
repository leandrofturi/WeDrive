import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// config
import { MAIN_HEADER_DESKTOP, MAIN_HEADER_MOBILE } from '../config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: MAIN_HEADER_MOBILE,
  [theme.breakpoints.up('xs')]: {
    paddingTop: MAIN_HEADER_DESKTOP
  },
}));

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => {
  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{`${title} | WeDrive`}</title>
      </Helmet>
      <RootStyle>
        {children}
      </RootStyle>
    </Box>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
