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
const News = Loadable(lazy(() => import('../views/utilities/News')))
const Tour = Loadable(lazy(() => import('../views/utilities/Tour')))
const Comment = Loadable(lazy(() => import('../views/utilities/Comment')))
const Statistical= Loadable(lazy(() => import('../views/utilities/Statistical')))
const Booktour= Loadable(lazy(() => import('../views/utilities/Booktour')))
const Voucher= Loadable(lazy(() => import('../views/utilities/Voucher')))
const Featured_Location= Loadable(lazy(() => import('../views/utilities/Featured_Location')))
const Type_tour= Loadable(lazy(() => import('../views/utilities/Type_tour')))
const Customer= Loadable(lazy(() => import('../views/utilities/Customer')))
const Service= Loadable(lazy(() => import('../views/utilities/Service')))
const Role= Loadable(lazy(() => import('../views/utilities/Role')))
const Schedule= Loadable(lazy(() => import('../views/utilities/Schedule')))
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
      { path: '/ui/customer', exact: true, element: <Customer /> },
      { path: '/ui/news', exact: true, element: <News /> },
      { path: '/ui/tour', exact: true, element: <Tour /> },
      { path: '/ui/comment', exact: true, element: <Comment /> },
      { path: '/ui/Booktour', exact: true, element: <Booktour /> },
      { path: '/ui/Voucher', exact: true, element: <Voucher /> },
      { path: '/ui/location', exact: true, element: <Featured_Location /> },
      { path: '/ui/typetour', exact: true, element: <Type_tour /> },
      { path: '/ui/service', exact: true, element: <Service /> },
      { path: '/ui/role', exact: true, element: <Role /> },
      { path: '/ui/schedule', exact: true, element: <Schedule /> },
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
