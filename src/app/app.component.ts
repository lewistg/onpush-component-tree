import {Component, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
    
import {LifecycleHooksLogEntry} from './lifecyclehookslog';
import {Observable} from 'rxjs/Observable';
import {LifecycleHooksLog} from './lifecyclehookslog';
import {isHighlightableComponent} from './highlightablecomponent';
import {periodizedObservable} from './util/periodizedobservable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private periodizedLogEntries: Observable<LifecycleHooksLogEntry>;

    public domHighlights = new EventEmitter<HTMLElement>();
    constructor(lifecycleHooksLog: LifecycleHooksLog) {
        this.periodizedLogEntries = periodizedObservable(lifecycleHooksLog.entries, 150);
        this.periodizedLogEntries 
            .map((logEntry: LifecycleHooksLogEntry) => {
                if (isHighlightableComponent(logEntry.component)) {
                    return logEntry.component.highlightTarget.nativeElement;
                }
            })
            .filter((elt: HTMLElement|undefined) => !!elt)
            .subscribe(this.domHighlights);
    }
}
