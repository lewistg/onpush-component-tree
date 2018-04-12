import {Point} from './point';
import {Size} from './size';

export interface Box extends Point, Size {}

export namespace BoxUtils {
    export function zeroBox(): Box {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
    }

    export function fromPoints(p1: Point, p2: Point): Box {
        const minX = Math.min(p1.x, p2.x);
        const minY = Math.min(p1.y, p2.y);
        const width = Math.abs(p1.x - p2.x);
        const height = Math.abs(p1.y - p2.y);
        return {
            x: minX,
            y: minY,
            width: width,
            height: height
        }
    }
}
