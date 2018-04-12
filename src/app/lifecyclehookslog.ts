import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

@Injectable()
export class LifecycleHooksLog {
    public entries =  new Observable<LifecycleHooksLogEntry>((s: Subscriber<LifecycleHooksLogEntry>) => {
        this._log = s.next.bind(s);
    });
    public log(entry: LifecycleHooksLogEntry) {
        this._log && this._log(entry);
    }
    private _log: (entry: LifecycleHooksLogEntry) => void;
}

export interface LifecycleHooksLogEntry {
    component: any,
    lifecycleEvent: LifecycleEvent,
}

export enum LifecycleEvent {
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy,
    /** Custom events */
    BeingChangeDetected
}
