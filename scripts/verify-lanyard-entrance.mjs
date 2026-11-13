import test from 'node:test';
import assert from 'node:assert/strict';
import {createEntranceGate, measureVisibility} from '../site/veylo-process/lanyard/entrance.mjs';

function badge(options = {}) {
  const events = [];
  const gate = createEntranceGate({
    ...options,
    onEnter: replay => events.push(replay ? 'intro' : 'resume'),
    onPause: () => events.push('pause'),
  });
  return {gate, events, visible: ratio => gate.setIntersection({isIntersecting: ratio > 0, intersectionRatio: ratio})};
}

test('preloading and a small visible sliver do not spend the intro', () => {
  const {gate, events, visible} = badge();
  gate.setReady(true);
  visible(0);
  visible(0.02);
  visible(0.54);
  assert.deepEqual(events, []);
  assert.equal(gate.isRunning(), false);
  visible(0.55);
  assert.deepEqual(events, ['intro']);
});

test('entering before textures or layout are ready waits for readiness', () => {
  const {gate, events, visible} = badge();
  visible(1);
  assert.deepEqual(events, []);
  gate.setReady(true);
  gate.setReady(true);
  visible(1);
  assert.deepEqual(events, ['intro']);
});

test('only a complete exit rearms the next drop', () => {
  const {gate, events, visible} = badge();
  gate.setReady(true);
  visible(1);
  visible(0.4);
  visible(0.6);
  assert.deepEqual(events, ['intro']);
  visible(0);
  visible(0.2);
  assert.deepEqual(events, ['intro', 'pause']);
  visible(0.8);
  assert.deepEqual(events, ['intro', 'pause', 'intro']);
});

test('a background tab cannot spend the first intro and resumes without replay', () => {
  const {gate, events, visible} = badge({initialPageVisible: false});
  gate.setReady(true);
  visible(1);
  assert.deepEqual(events, []);
  gate.setPageVisible(true);
  gate.setPageVisible(false);
  gate.setPageVisible(true);
  assert.deepEqual(events, ['intro', 'pause', 'resume']);
});

test('late resources loaded off screen still wait for the next visible entry', () => {
  const {gate, events, visible} = badge();
  visible(1);
  visible(0);
  gate.setReady(true);
  assert.deepEqual(events, []);
  visible(0.9);
  assert.deepEqual(events, ['intro']);
});

test('late CSS sizing refreshes a stale zero-height visibility sample', () => {
  const {gate, events} = badge();
  gate.setIntersection({isIntersecting: true, intersectionRatio: 1});
  gate.setIntersection(measureVisibility({left: 1016, top: 1201, width: 379, height: 420}, 1470, 1243));
  gate.setReady(true);
  assert.deepEqual(events, []);
  assert.deepEqual(measureVisibility({left: 0, top: 100, width: 379, height: 0}, 1470, 1243), {isIntersecting: false, intersectionRatio: 0});
  gate.setIntersection(measureVisibility({left: 1016, top: 600, width: 379, height: 420}, 1470, 1243));
  assert.deepEqual(events, ['intro']);
});
