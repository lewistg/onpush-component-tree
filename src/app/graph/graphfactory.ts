import {Point} from './../math/point';
import {GraphNode, ReadonlyGraphNode} from './graphnode';
import {Size} from './../math/size';

/*
 * Returns the root node
 */
export function createCompleteBinaryTree(numNodes: number, size: Size): ReadonlyGraphNode|undefined {
    if (numNodes == 0) {
        return;
    }
    const levels: GraphNode[][] = Array.from(getLevels(numNodes));
    connectNodes(levels);
    positionNodes(levels, size);
    return levels[0][0];
}

function connectNodes(levels: GraphNode[][]) {
    for (let i = 0; i < levels.length - 1; i++) {
        let currLevel = levels[i];
        let nextLevel = levels[i + 1];
        for (let j = 0; j < currLevel.length; j++) {
            let n = currLevel[j];
            let childStartIndex = 2 * j;
            n.children = nextLevel.slice(childStartIndex, childStartIndex + 2);
        }
    }
}

function positionNodes(levels: GraphNode[][], size: Size) {
    if (levels.length == 0) {
        return;
    }
    let gapWidthBetweenLevels = size.height / (levels.length + 1);
    let maxNodesPerLevel = 1;
    for (let i = 0; i < levels.length; i++) {
        let gapWidthBetweenNodes = size.width / (maxNodesPerLevel + 1);
        let y = (i + 1) * gapWidthBetweenLevels;
        for (let j = 0; j < levels[i].length; j++) {
            let n = levels[i][j];
            let x = (j + 1) * gapWidthBetweenNodes;
            n.position = {x: x, y: y};
        }
        maxNodesPerLevel *= 2; 
    }
}

function* getLevels(numNodes: number) {
    let nodesRemaining = numNodes;
    let levelMaxNodeLength = 1;
    while(nodesRemaining > 0) {
        const levelNodeLength = Math.min(levelMaxNodeLength, nodesRemaining);
        yield Array.from(getEmptyNodes(levelNodeLength));
        nodesRemaining -= levelNodeLength;
        levelMaxNodeLength *= 2;
    }
}

function* getEmptyNodes(numNodes: number) {
    for (let i = 0; i < numNodes; i++) {
        yield new GraphNode([], {x: 0, y: 0});
    }
}
