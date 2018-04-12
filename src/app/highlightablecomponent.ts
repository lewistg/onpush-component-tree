import {ElementRef} from '@angular/core';

export interface HighlightableComponent {
    highlightTarget: ElementRef;
}

export function isHighlightableComponent(c: any): c is HighlightableComponent {
    return !!c && c.highlightTarget instanceof ElementRef;
}
