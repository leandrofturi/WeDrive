import { Suspense, lazy } from 'react';
import { SkewLoader } from 'react-spinners';
import { Navigate, useRoutes } from 'react-router-dom';
// guards
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';
// layouts
import MainLayout from './layouts/main';
import DashboardLayout from './layouts/dashboard';

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
          path: 'login-company',
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
        {
          path: 'register-company',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: 'company',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/company/dashboard" replace />, index: true },
        { path: 'dashboard', element: <GeneralApp /> },
        { path: 'account', element: <Account /> },
        { path: 'new-user', element: <UserCreate /> },
        { path: ':id/edit-user', element: <UserCreate /> },
        { path: 'list-users', element: <UserList /> },
      ]
    },

    {
      path: 'app',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/app/departures" replace />, index: true },
        { path: 'departures', element: <Departures /> },
        { path: 'account', element: <UserAccount /> },
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

const GeneralApp = Loadable(lazy(() => import('./pages/GeneralApp')));
const Departures = Loadable(lazy(() => import('./pages/Departures')));

const Account = Loadable(lazy(() => import('./pages/Account')));
const UserAccount = Loadable(lazy(() => import('./pages/UserAccount')));
const UserCreate = Loadable(lazy(() => import('./pages/UserCreate')));
const UserList = Loadable(lazy(() => import('./pages/UserList')));
