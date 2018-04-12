import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

export function periodizedObservable<T>(source: Observable<T>, period: number): Observable<T> {
    const queue: T[] = [];
    let intervalId: number;
    let subscriber: Subscriber<T>;
    let sourceCompleted: boolean = false;
    return new Observable((s: Subscriber<T>) => {
        subscriber = s;
        source.subscribe(enqueue, undefined, () => {
            if (intervalId !== undefined) {
                window.clearInterval(intervalId);
            }
            sourceCompleted = true;
        })
    });
    function enqueue(value: T) {
        if (queue.length == 0) {
            intervalId = window.setInterval(() => dequeue(), period);
        }
        queue.push(value);
    }
    function dequeue() {
        const value = queue.shift();
        subscriber.next(value);
        if (queue.length == 0) {
            window.clearInterval(intervalId);
            intervalId = undefined;
            if (sourceCompleted) {
                subscriber.complete();
            }
        }
    }
}
