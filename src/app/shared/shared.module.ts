import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroCustomModule } from './ng-zorro-custom.module';
import { MarkdownModule } from 'ngx-markdown';
import { AngularDraggableModule } from 'angular2-draggable';

import { IconsProviderModule } from './icons-provider.module';
import { CodeBlockComponent } from './code-block/code-block.component';

@NgModule({
  declarations: [CodeBlockComponent],
  imports: [
    CommonModule,
    IconsProviderModule,
    NgZorroCustomModule,
    MarkdownModule.forChild(),
    AngularDraggableModule,
  ],
  exports: [
    IconsProviderModule,
    NgZorroCustomModule,
    MarkdownModule,
    CodeBlockComponent,
    AngularDraggableModule,
  ],
})
export class SharedModule {}
