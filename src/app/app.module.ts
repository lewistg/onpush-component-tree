import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppComponent} from './app.component';
import {ComponentTreeNodeComponent} from './componenttreenode/componenttreenode.component';
import {ComponentTreeComponent} from './componenttree/componenttree.component';
import {ComponentTreeEdgeComponent} from './componenttreeedge/componenttreeedge.component';
import {DOMHighlighterComponent} from './domhighlighter/domhighlighter.component';
import {LifecycleHooksLog} from './lifecyclehookslog';
import {NoopDirective} from './noop/noop.directive';

@NgModule({
  declarations: [
    AppComponent,
    ComponentTreeComponent,
    ComponentTreeEdgeComponent,
    ComponentTreeNodeComponent,
    DOMHighlighterComponent,
    NoopDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  providers: [LifecycleHooksLog],
  bootstrap: [AppComponent]
})
export class AppModule { }
