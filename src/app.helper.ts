import { fromEvent, interval, merge } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

const MILLISECONDS_THROTTLE_TIME = 1 * 1000;
const MILLISECONDS_INTERVAL_TIME = 60 * 1000; // INFO: same with one minute

export const triggerEventObservable = () => {
  const keyBoardEvent = fromEvent(document, 'keyup').pipe(
    throttleTime(MILLISECONDS_THROTTLE_TIME)
  );
  const mouseEvent = fromEvent(document, 'mouseover').pipe(
    throttleTime(MILLISECONDS_THROTTLE_TIME)
  );
  return merge(keyBoardEvent, mouseEvent);
};

export const intervalObservable = () => interval(MILLISECONDS_INTERVAL_TIME);
