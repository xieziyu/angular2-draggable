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
    name: 'Draggable Demo',
    icon: 'fa fa-bookmark',
    url: '/draggable',
    children: [
      {
        name: 'Basic Usage',
        url: '/draggable/usage/basic',
        icon: 'fa fa-arrows'
      },
      {
        name: 'Options',
        url: '/draggable/usage/options',
        icon: 'fa fa-cogs'
      },
      {
        name: 'Events',
        url: '/draggable/usage/events',
        icon: 'fa fa-comment'
      },
      {
        name: 'Boundary Check',
        url: '/draggable/usage/boundary',
        icon: 'fa fa-square-o'
      },
      {
        name: 'API',
        url: '/draggable/usage/api',
        icon: 'fa fa-code'
      },
      {
        name: 'Swapping',
        url: '/draggable/advance/swap',
        icon: 'fa fa-refresh'
      },
      {
        name: 'Snap To Grid',
        url: '/draggable/advance/snap-grid',
        icon: 'fa fa-th-large',
      },
    ]
  },
  {
    name: 'Resizable Demo',
    icon: 'fa fa-bookmark',
    url: '/resizable',
    children: [
      {
        name: 'Default',
        url: '/resizable/default',
        icon: 'fa fa-arrows-v'
      },
      {
        name: 'Events',
        url: '/resizable/events',
        icon: 'fa fa-comment'
      },
      {
        name: 'Aspect Ratio',
        url: '/resizable/aspect-ratio',
        icon: 'fa fa-square-o',
        badge: {
          variant: 'success',
          text: 'new'
        }
      },
    ]
  }
];
