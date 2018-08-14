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
      }
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
        icon: 'fa fa-square-o'
      },
      {
        name: 'Containment',
        url: '/resizable/containment',
        icon: 'fa fa-window-close'
      },
      {
        name: 'Snap To Grid',
        url: '/resizable/grid',
        icon: 'fa fa-th-large',
        badge: {
          variant: 'success',
          text: 'new'
        }
      },
      {
        name: 'Min / Max Size',
        url: '/resizable/min-max',
        icon: 'fa fa-window-minimize',
        badge: {
          variant: 'success',
          text: 'new'
        }
      },
    ]
  },
  {
    name: 'Advanced Demo',
    icon: 'fa fa-bookmark',
    url: '/advance',
    children: [
      {
        name: 'Swapping',
        url: '/advance/swap',
        icon: 'fa fa-refresh'
      },
      {
        name: 'Snap To Grid',
        url: '/advance/snap-grid',
        icon: 'fa fa-th-large',
      },
      {
        name: 'iframe',
        url: '/advance/iframe',
        icon: 'fa fa-window-maximize'
      }
    ]
  }
];
