import {Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';

import {createCompleteBinaryTree} from './../graph/graphfactory';
import {Size} from './../math/size';
import {ReadonlyGraphNode} from './../graph/graphnode';

/**
 * A component that renders its tree of child components as a literal tree with
 * nodes and lines indicating parent child relationships. The tree is a
 * complete binary tree.
 */
@Component({
    selector:  "component-tree",
    templateUrl: "./componenttree.component.html",
    styleUrls: ['./componenttree.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentTreeComponent {
    @Input() public numLevels: number;
    @Input() public size: Size;
    public rootNode: ReadonlyGraphNode;
    private sizeStyle: {[key: string]: number};

    public ngOnChanges(changes: SimpleChanges) {
        const isEmpty = Object.keys(changes).length == 0;
        if (!isEmpty && this.numLevels > 0 && !!this.size) {
            this.rootNode = createCompleteBinaryTree(this.numLevels, this.size);
            this.sizeStyle = {
                'width.px': this.size.width,
                'height.px': this.size.height
            }
        }
    }
}
