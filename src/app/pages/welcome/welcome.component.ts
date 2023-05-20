import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  installText = `## Install
\`\`\`bash
# npm:
npm install angular2-draggable --save

# yarn:
yarn add angular2-draggable
\`\`\``;
  importText = `## Import
\`\`\`diff
+ import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  imports: [
    ...,
+   AngularDraggableModule
  ],
})
export class AppModule { }
\`\`\``;
  draggableHTML = `## Draggable HTML
\`\`\`html
<!-- Basic Usage -->
<div ngDraggable> Drag Me! </div>

<!-- Disable -->
<div [ngDraggable]="false"> Disabled </div>
\`\`\``;
  resizableHTML = `## Resizable HTML
\`\`\`html
<!-- Basic Usage -->
<div ngResizable> I'm resizable </div>

<!-- Disable -->
<div [ngResizable]="false"> Disabled </div>
\`\`\``;
  resizableCSS = `## Resizable CSS
\`\`\`diff
// angular.json
"styles": [
    ...
+   "node_modules/angular2-draggable/css/resizable.min.css"
]
\`\`\``;
}
