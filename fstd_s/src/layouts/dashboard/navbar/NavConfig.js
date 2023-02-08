// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  booking: getIcon('ic_booking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  
{
     subheader: 'Account management',
     items: [
       // USER
      {
           title: 'User',
          //  path: PATH_DASHBOARD.user.root,
           icon: ICONS.user,
           children: [
            { title: 'Role', path: PATH_DASHBOARD.traineelist },
            { title: 'Privileges', path: PATH_DASHBOARD.traineelist },
           ],
         },
        ],
      },
  {
    subheader: 'Master Data', 
    items: [
      {
       title: 'Master Data',
       children: [
      { title: 'Trainees', path: PATH_DASHBOARD.traineelist },
      { title: 'Instructor', path: PATH_DASHBOARD.instructorlist },
      
      
        ],
    },
  ],
},
   {
     subheader: 'Schedule',
     icon: ICONS.banking,
     items: [
      { 
        title: 'Schedule view Type',
        children:[
     { title: 'Admins View', path: PATH_DASHBOARD.q400simulator},
     { title: 'Trainees View', path: PATH_DASHBOARD.scheduler },
     

     ],
    },
  ],
},

{
subheader:'Scheduler',
icon: ICONS.booking,
      items:[
      {
        title: 'Calendar', path: PATH_DASHBOARD.calendar
      },
    ],
  },
]


export default navConfig;
