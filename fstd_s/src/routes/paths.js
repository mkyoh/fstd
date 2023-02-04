// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  traineeSignin:path(ROOTS_AUTH, '/trainee-signin'),
};

export const PATH_PAGE = {
  about: '/about-us',
  contact: '/contact-us',
  service: '/service'
  
  
 
};
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  scheduler: path(ROOTS_DASHBOARD, '/scheduler'),
  traineelist:path(ROOTS_DASHBOARD, '/traineelist'),
  instructorlist:path(ROOTS_DASHBOARD,'/instructorlist'),
  q400simulator:path(ROOTS_DASHBOARD, '/q400simulator'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  };



  // calendar: path(ROOTS_DASHBOARD, '/calendar'),
  // kanban: path(ROOTS_DASHBOARD, '/kanban'),
  // user: {
  //   root: path(ROOTS_DASHBOARD, '/user'),
  //   new: path(ROOTS_DASHBOARD, '/user/new'),
  //   list: path(ROOTS_DASHBOARD, '/user/list'),
  //   cards: path(ROOTS_DASHBOARD, '/user/cards'),
  //   profile: path(ROOTS_DASHBOARD, '/user/profile'),
  //   account: path(ROOTS_DASHBOARD, '/user/account'),
  //   edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
  //   demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  // },
 
//};
