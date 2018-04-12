import {Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';

import {GraphNode} from './../graph/graphnode';
import {Box, BoxUtils} from './../math/box';
import {Point, PointUtils} from './../math/point';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector:  'component-tree-edge',
    templateUrl: './componenttreeedge.component.html',
    styleUrls: ['./componenttreeedge.component.css'],
})
export class ComponentTreeEdgeComponent implements OnChanges {
    @Input() public startNode: GraphNode;
    @Input() public endNode: GraphNode;
    public boundingBox: Box = BoxUtils.zeroBox();
    public lineSegment: {start: Point, end: Point};
    public positionStyle: {[positionProp: string]: number};

    public ngOnChanges(changes: SimpleChanges) {
        this.boundingBox = BoxUtils.fromPoints(this.startNode.position, this.endNode.position);
        this.lineSegment = this.getLineSegment();
        this.positionStyle = this.getPositionStyle();
    }

    public getLineSegment() {
        return {
            start: PointUtils.sub(this.startNode.position, this.boundingBox),
            end: PointUtils.sub(this.endNode.position, this.boundingBox)
        };
    }

    public getPositionStyle() {
        return {
            'left.px': this.boundingBox.x,
            'top.px': this.boundingBox.y
        };
    }
}
