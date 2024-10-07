import {
   IconLogin,IconAdjustments,
   IconUserPlus,IconUsers,
   IconChartPie,IconCategory,IconTicket,IconMessageReport,IconShoppingCart,
   IconNews,IconGift,IconMapPin,IconUser,IconLocationPin,IconCalendarMonth,
   IconUserCircle,IconDeviceHeartMonitor
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAdjustments,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Danh Mục',
    icon: IconCategory,
    href: '/ui/category',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Thống Kê',
    icon: IconChartPie,
    href: '/ui/statistical',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí User',
    icon: IconUser,
    href: '/ui/user',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Bài Viết',
    icon: IconNews,
    href: '/ui/news',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Tour',
    icon: IconTicket,
    href: '/ui/tour',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Bình Luận',
    icon: IconMessageReport,
    href: '/ui/comment',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Vé Đặt Tour',
    icon: IconShoppingCart,
    href: '/ui/booktour',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Khuyến Mãi',
    icon: IconGift,
    href: '/ui/voucher',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Địa Điểm',
    icon: IconMapPin,
    href: '/ui/location',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Loại Tour',
    icon: IconLocationPin,
    href: '/ui/typetour',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Khách Hàng',
    icon: IconUsers,
    href: '/ui/customer',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Dịch vụ',
    icon: IconDeviceHeartMonitor,
    href: '/ui/service',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Vai Trò',
    icon: IconUserCircle,
    href: '/ui/role',
  },
  {
    id: uniqueId(),
    title: 'Quản Lí Lịch Trình',
    icon: IconCalendarMonth,
    href: '/ui/schedule',
  },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Extra',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Icons',
  //   icon: IconMoodHappy,
  //   href: '/icons',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Sample Page',
  //   icon: IconAperture,
  //   href: '/sample-page',
  // },
];

export default Menuitems;
