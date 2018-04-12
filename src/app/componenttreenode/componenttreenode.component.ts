import {
    Component, 
    ChangeDetectorRef, 
    ChangeDetectionStrategy, 
    ElementRef,
    Inject, 
    Input, 
    OnChanges, 
    SimpleChanges,
    ViewChild,
} from '@angular/core';

import {GraphNode} from './../graph/graphnode';
import {Point} from '../math/point';
import {LifecycleHooksLog, LifecycleEvent} from './../lifecyclehookslog';
import {HighlightableComponent} from './../highlightablecomponent';

@Component({
    selector:  "component-tree-node",
    templateUrl: './componenttreenode.component.html',
    styleUrls: ['./componenttreenode.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentTreeNodeComponent implements OnChanges, HighlightableComponent {
    @Input() public node: GraphNode;
    public positionStyle: {[key: string]: number};

    @ViewChild('highlightTarget') public highlightTarget: ElementRef; 

    constructor(
        private elementRef: ElementRef,
        private lifecycleHooksLog: LifecycleHooksLog
    ) {
    }

    public onClickMarkForCheck() {
        // When an DOM event fires in the view (such as clicking), the
        // component is marked as dirty.
    }

    public ngOnChanges(simpleChanges: SimpleChanges) {
        this.positionStyle = this.getPositionStyle();
    }

    /**
     * This property is only read by Angular's change detector. Thus we use
     * this accessor as a proxy to detect when the component is being change
     * detected. (Credit to Ryan Stringham and Tyler Davis who originally came
     * up with a similar method.)
     */
    public get changeDetectionCanary(): any {
        this.lifecycleHooksLog.log({
            component: this,
            lifecycleEvent: LifecycleEvent.BeingChangeDetected
        });
        return 0;
    }

    public getChildOffset(child: GraphNode): Point {
        return {
            x: this.node.position.x - child.position.x,
            y: this.node.position.y - child.position.y
        }
    }

    private getPositionStyle() {
        const topLeft = this.getNodeTopLeft();
        return {
            'left.px': topLeft.x,
            'top.px': topLeft.y
        }
    }

    private getNodeTopLeft(): Point {
        return {
            x: this.node.position.x - ComponentTreeNodeComponent.NODE_RADIUS,
            y: this.node.position.y - ComponentTreeNodeComponent.NODE_RADIUS
        }
    }
    private static readonly NODE_RADIUS = 13;
}
