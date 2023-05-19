import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: 'draggable',
    loadChildren: () =>
      import('./pages/demo-draggable/demo-draggable.module').then(m => m.DemoDraggableModule),
  },
  {
    path: 'resizable',
    loadChildren: () =>
      import('./pages/demo-resizable/demo-resizable.module').then(m => m.DemoResizableModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
