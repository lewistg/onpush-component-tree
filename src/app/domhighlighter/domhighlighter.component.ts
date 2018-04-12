import {
    AfterViewInit,
    Component, 
    ChangeDetectionStrategy, 
    ElementRef,
    EventEmitter, 
    OnChanges, 
    Input, 
    SimpleChanges, 
    ViewChild,
    NgZone
} from '@angular/core';

import {Box} from './../math/box';
import {Size} from './../math/size';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector:  'dom-highlighter',
    templateUrl: './domhighlighter.component.html',
    styleUrls: ['./domhighlighter.component.css'],
})
export class DOMHighlighterComponent implements AfterViewInit, OnChanges {
    @Input() domHighlights: EventEmitter<HTMLElement>;
    private domHighlightsSub: Subscription;

    public canvasSize = new BehaviorSubject<Size>(this.getWindowSize());

    @ViewChild('canvas') canvas: ElementRef;
    private context: CanvasRenderingContext2D;

    public highlights: Highlight[] = [];

    constructor(zone: NgZone) {
        this.setCanvasSizeOnWindowResize();
        this.startRenderLoop();
    }

    private startRenderLoop() {
        let timeDelta: number;
        let prevTimestamp: number;
        let loop = (timestamp: number) => {
            if (!prevTimestamp) {
                prevTimestamp = timestamp;
                requestAnimationFrame((ts: number) => loop(ts));
                return;
            }
            timeDelta = timestamp - prevTimestamp;

            this.clearHighlights();
            this.updateHighlights(timeDelta);
            this.renderHighlights(timeDelta);

            prevTimestamp = timestamp;
            requestAnimationFrame((ts: number) => loop(ts));
        }
        requestAnimationFrame((ts: number) => loop(ts));
    }

    private clearHighlights() {
        this.highlights.forEach((h: Highlight) => {
            const box = h.box;
            this.context.clearRect(box.x, box.y, box.width, box.height);
        });
    }

    private updateHighlights(timeDelta: number) {
        this.highlights = this.highlights
            .filter((h: Highlight) => {
                if (h.timeLeft <= 0) {
                    return false;
                }
                h.timeLeft = Math.max(0, h.timeLeft - timeDelta);
                return true;
            })
    }

    private renderHighlights(timeDelta: number) {
        this.highlights.forEach((h: Highlight) => {
            const box = h.box;
            const alpha = this.getHighlightAlpha(h.timeLeft);
            this.context.fillStyle = `rgba(0, 255, 0, ${alpha})`;
            this.context.fillRect(box.x, box.y, box.width, box.height);
        });
    }

    private getHighlightAlpha(timeLeft: number): number {
        return (timeLeft / HIGHTLIGHT_DURATION) * MAX_ALPHA;
    }

    public ngAfterViewInit() {
        this.context = this.canvas.nativeElement.getContext('2d');
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (this.domHighlightsSub) {
            this.domHighlightsSub.unsubscribe();
        }
        if (!this.domHighlights) {
            return;
        }
        this.domHighlightsSub = this.domHighlights.subscribe((element: HTMLElement) => {
            const rect = element.getBoundingClientRect();
            this.highlights.push({
                box: {
                    x: Math.round(rect.left),
                    y: Math.round(rect.top),
                    width: Math.round(rect.width),
                    height: Math.round(rect.height)
                },
                timeLeft: HIGHTLIGHT_DURATION 
            })
        });
    }

    private setCanvasSizeOnWindowResize() {
        Observable
            .fromEvent(window, 'resize')
            .debounceTime(50)
            .map((_: any) => this.getWindowSize())
            .subscribe(this.canvasSize);
    }

    private getWindowSize(): Size {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
}

interface Highlight {
    box: Box;
    timeLeft: number;
}

const MAX_ALPHA = 0.85;
const HIGHTLIGHT_DURATION = 750;
