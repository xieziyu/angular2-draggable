import { NgModule } from '@angular/core';
import { AngularDraggableDirective } from './directive/angular-draggable.directive';

@NgModule({
  declarations: [
    AngularDraggableDirective
  ],
  exports: [
    AngularDraggableDirective
  ]
})
export class AngularDraggableModule { }

export { AngularDraggableDirective };
