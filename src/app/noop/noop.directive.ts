import {ChangeDetectionStrategy, Directive, Input} from '@angular/core';

@Directive({
    selector:  '[noop]',
})
export class NoopDirective {
    @Input() noop: any;
}
