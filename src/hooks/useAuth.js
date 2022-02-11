import { useContext } from 'react';
import { AuthContext } from '../contexts/Context';

// ----------------------------------------------------------------------

const useAuth = () => useContext(AuthContext);

export default useAuth;
