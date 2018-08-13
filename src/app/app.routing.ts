import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

import { HomeComponent } from './views/home/home.component';
import { ChangelogsComponent } from './views/changelogs/changelogs.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'changelogs',
        component: ChangelogsComponent,
        data: { title: 'CHANGELOG' }
      },
      {
        path: 'draggable',
        children: [
          {
            path: 'usage',
            loadChildren: './views/usage/usage.module#UsageModule',
            data: { title: 'Usage' }
          }
        ]
      },
      {
        path: 'resizable',
        loadChildren: './views/resizable-demo/resizable-demo.module#ResizableDemoModule',
        data: { title: 'Resizable' }
      },
      {
        path: 'advance',
        loadChildren: './views/adv-demo/adv-demo.module#AdvDemoModule',
        data: { title: 'Advance' }
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  },

  { path: '**', redirectTo: '/pages/404' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
