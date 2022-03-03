// routes
import { PATH_AUTH, PATH_PAGE } from '../../paths';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Para você',
    icon: <Iconify icon={'bi:pin-map-fill'} {...ICON_SIZE} />,
    path: PATH_AUTH.login,
  },
  {
    title: 'Para seu negócio',
    icon: <Iconify icon={'bi:pin-map'} {...ICON_SIZE} />,
    path: PATH_AUTH.loginCompany,
  },
  {
    title: 'FAQs',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: PATH_PAGE.faqs,
  },
];

export default menuConfig;
