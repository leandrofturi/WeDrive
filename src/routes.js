import { Suspense, lazy } from 'react';
import { SkewLoader } from 'react-spinners';
import { Navigate, useRoutes } from 'react-router-dom';
// guards
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<SkewLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: 'app',
      element: (
        <AuthGuard>
          <LogoOnlyLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/app/home" replace />, index: true },
        { path: 'home', element: <Home /> },
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ])
}

const Login = Loadable(lazy(() => import('./pages/Login')));
const Register = Loadable(lazy(() => import('./pages/Register')));

const Home = Loadable(lazy(() => import('./pages/Home')));

const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
