import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    if (window.location.pathname.endsWith('company')) {
      return <Navigate to="/company" />;
    }
    else {
      return <Navigate to="/app" />;
    }
  }

  return <>{children}</>;
}
