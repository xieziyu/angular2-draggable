import { NgModule } from '@angular/core';
import { AngularDraggableDirective } from './directive/angular-draggable.directive';
export * from './directive/angular-draggable.directive';
export var AngularDraggableModule = (function () {
    function AngularDraggableModule() {
    }
    AngularDraggableModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AngularDraggableDirective
                    ],
                    exports: [
                        AngularDraggableDirective
                    ]
                },] },
    ];
    AngularDraggableModule.ctorParameters = function () { return []; };
    return AngularDraggableModule;
}());
//# sourceMappingURL=index.js.map