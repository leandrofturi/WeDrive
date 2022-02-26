import { Suspense, lazy } from 'react';
import { SkewLoader } from 'react-spinners';
import { Navigate, useRoutes } from 'react-router-dom';
// guards
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';
// layouts
import MainLayout from './layouts/main';

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
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/app/departures" replace />, index: true },
        { path: 'departures', element: <Departures /> },
      ]
    },

    // Main Routes
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <Home />, index: true },
        { path: 'about-us', element: <div /> },
        { path: 'contact-us', element: <div /> },
        { path: 'faqs', element: <FAQs /> },
      ]
    }
  ])
}

const Login = Loadable(lazy(() => import('./pages/Login')));
const Register = Loadable(lazy(() => import('./pages/Register')));

const Home = Loadable(lazy(() => import('./pages/Home')));
const FAQs = Loadable(lazy(() => import('./pages/FAQs')));

const Departures = Loadable(lazy(() => import('./pages/Departures')));
