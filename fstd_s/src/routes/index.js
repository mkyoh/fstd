import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import { PATH_AFTER_LOGIN } from '../config';
import { PATH_AFTER_SIGNIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';




const Loadable = (Component) => (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();
  
    return (
      <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
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
          { path: 'login-unprotected', element: <Login /> },
          { path: 'reset-password', element: <ResetPassword /> },
          {path: 'trainee-signin', element: <TraineeSignin/>},
          { path: 'verify', element: <VerifyCode /> },
        ],
      },
      {
        path: 'dashboard',
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>   
        ),
        children: [
          { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
          { path: 'scheduler', element: <Scheduler /> },
          { path: 'traineelist', element: <TraineeList /> },
          { path: 'instructorlist', element: <InstructorList/> },
          { path: 'q400simulator', element: <Q400Simulator/> },
          { path: 'calendar', element: <Calendar/> },

        ],
      },
         {
        path: 'dashboard',
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>   
        ),
        children: [
          { element: <Navigate to={PATH_AFTER_SIGNIN} replace />, index: true },
          { path: 'scheduler', element: <Scheduler /> },
          // { path: 'about-us', element: <About /> },
          // { path: 'contact-us', element: <Contact /> },
        ],
      },
  
  
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { element: <HomePage />, index: true },
          { path: 'about-us', element: <About /> },
          { path: 'contact-us', element: <Contact /> },
          { path: 'service', element: <Service /> },
        //  { path: 'auth/login', element: <Login />}
        ],
      },
     
    ]);
  }
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const TraineeSignin = Loadable(lazy(() => import('../pages/auth/TraineeSignin')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
const Scheduler = Loadable(lazy(() => import('../pages/dashboard/Scheduler')));
const TraineeList = Loadable(lazy(() => import('../pages/dashboard/TraineeList')));
const InstructorList = Loadable(lazy(() => import('../pages/dashboard/InstructorList')));
const Q400Simulator = Loadable(lazy(() => import('../pages/dashboard/Q400Simulator')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const HomePage= Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
const Service = Loadable(lazy(() => import('../pages/Service')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));