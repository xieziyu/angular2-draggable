import { NgModule } from '@angular/core';
import { AngularDraggableDirective } from './angular-draggable.directive';
import { AngularResizableDirective } from './angular-resizable.directive';

@NgModule({
  imports: [
  ],
  declarations: [
    AngularDraggableDirective,
    AngularResizableDirective
  ],
  exports: [
    AngularDraggableDirective,
    AngularResizableDirective
  ]
})
export class AngularDraggableModule { }
