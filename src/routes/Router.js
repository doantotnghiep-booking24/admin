import { lazy } from 'react';
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
const Hotel = Loadable(lazy(() => import ('../views/utilities/Hotel')))
const Featured_Location= Loadable(lazy(() => import('../views/utilities/Featured_Location')))
const Type_tour= Loadable(lazy(() => import('../views/utilities/Type_tour')))
const Customer= Loadable(lazy(() => import('../views/utilities/Customer')))
const Service= Loadable(lazy(() => import('../views/utilities/Service')))
const Role= Loadable(lazy(() => import('../views/utilities/Role')))
const Schedule= Loadable(lazy(() => import('../views/utilities/Schedule')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = (isAuth) => [
  {
    path: "/",
    element: isAuth ? <FullLayout /> : <Navigate to="/auth/login" />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "ui/category", element: <Category /> },
      { path: "ui/statistical", element: <Statistical /> },
      { path: "ui/user", element: <User /> },
      { path: "ui/customer", element: <Customer /> },
      { path: "ui/news", element: <News /> },
      { path: "ui/tour", element: <Tour /> },
      { path: "ui/comment", element: <Comment /> },
      { path: "ui/Booktour", element: <Booktour /> },
      { path: "ui/Hotel", element: <Hotel/> },
      { path: "ui/Voucher", element: <Voucher /> },
      { path: "ui/location", element: <Featured_Location /> },
      { path: "ui/typetour", element: <Type_tour /> },
      { path: "ui/service", element: <Service /> },
      { path: "ui/role", element: <Role /> },
      { path: "ui/schedule", element: <Schedule /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: !isAuth ? <BlankLayout /> : <Navigate to="/" />,
    children: [
      { path: "login", element: <Login /> },
    ],
  },
  
];


export default Router;


