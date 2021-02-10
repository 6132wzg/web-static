/**
 * requestAnimationFrame polyfill
 */

let prev = Date.now();

/* istanbul ignore next */
function fallback(fn) {
  // fn FrameRequestCallback
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

/* istanbul ignore next */
const iRaf = window.requestAnimationFrame || fallback;

/* istanbul ignore next */
const iCancel = window.cancelAnimationFrame || window.clearTimeout;

export function raf(fn) {
  return iRaf.call(window, fn);
}

// double raf for animation
export function doubleRaf(fn) {
  raf(() => {
    raf(fn);
  });
}

export function cancelRaf(id) {
  iCancel.call(window, id);
}
