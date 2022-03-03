// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_APP = '/app';
const ROOTS_AUTH = '/auth';
const ROOTS_COMPANY = '/company';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginCompany: path(ROOTS_AUTH, '/login-company'),
  registerCompany: path(ROOTS_AUTH, '/register-company'),
};

export const PATH_PAGE = {
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
};

export const PATH_COMPANY = {
  root: ROOTS_COMPANY,
  dashboard: path(ROOTS_COMPANY, '/dashboard'),
  user: {
    account: path(ROOTS_COMPANY, '/account'),
    newUser: path(ROOTS_COMPANY, '/new-user'),
    list: path(ROOTS_COMPANY, '/list-users'),
  }
};

export const PATH_APP = {
  root: ROOTS_APP,
  departures: path(ROOTS_APP, '/departures'),
  user: {
    account: path(ROOTS_APP, '/account'),
  }
};
