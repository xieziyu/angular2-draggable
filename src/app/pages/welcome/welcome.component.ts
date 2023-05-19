import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  installText = `
  ## Install
  \`\`\`bash
  npm install angular2-draggable --save
  # or use yarn:
  # yarn add angular2-draggable
  \`\`\`
`;
  importText = `
  ## Import
  \`\`\`diff
  + import { AngularDraggableModule } from 'angular2-draggable';

  @NgModule({
    imports: [
      ...,
  +   AngularDraggableModule
    ],
  })
  export class AppModule { }
  \`\`\`
`;
}
