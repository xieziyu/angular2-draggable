export const navigation = [
  {
    name: 'Home',
    url: '/home',
    icon: 'fa fa-home',
  },
  {
    name: 'Change Logs',
    url: '/changelogs',
    icon: 'fa fa-file-text-o',
  },
  {
    title: true,
    name: 'Getting Started'
  },
  {
    name: 'Basic Usage',
    url: '/usage/basic',
    icon: 'fa fa-arrows'
  },
  {
    name: 'Options',
    url: '/usage/options',
    icon: 'fa fa-cogs'
  },
  {
    name: 'Events',
    url: '/usage/events',
    icon: 'fa fa-comment',
    badge: {
      variant: 'success',
      text: 'new'
    }
  },
  {
    name: 'Boundary Check',
    url: '/usage/boundary',
    icon: 'fa fa-square-o'
  },
  {
    name: 'API',
    url: '/usage/api',
    icon: 'fa fa-code'
  },
  {
    title: true,
    name: 'Advanced Usage'
  },
  {
    name: 'Swapping',
    url: '/advance/swap',
    icon: 'fa fa-refresh',
    badge: {
      variant: 'success',
      text: 'new'
    }
  },
];
