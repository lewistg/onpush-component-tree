import {Point} from './../math/point';

export class GraphNode {
    constructor(public children: GraphNode[], public position: Point) {
    }
}

export class ReadonlyGraphNode {
    constructor(public readonly children: ReadonlyArray<ReadonlyGraphNode>, public readonly position: Point) {
    }
}
