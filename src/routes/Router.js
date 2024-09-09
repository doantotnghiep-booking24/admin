import  { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const Category = Loadable(lazy(() => import('../views/utilities/Category')))
const User = Loadable(lazy(() => import('../views/utilities/User')))
const Oder = Loadable(lazy(() => import('../views/utilities/Oder')))
const Tour = Loadable(lazy(() => import('../views/utilities/Tour')))
const Comment = Loadable(lazy(() => import('../views/utilities/Comment')))
const Statistical= Loadable(lazy(() => import('../views/utilities/Statistical')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/ui/category', exact: true, element: <Category /> },
      { path: '/ui/statistical', exact: true, element: <Statistical /> },
      { path: '/ui/user', exact: true, element: <User /> },
      { path: '/ui/oder', exact: true, element: <Oder /> },
      { path: '/ui/tour', exact: true, element: <Tour /> },
      { path: '/ui/comment', exact: true, element: <Comment /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
