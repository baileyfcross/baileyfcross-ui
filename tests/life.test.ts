import { test } from 'node:test';
import assert from 'node:assert/strict';
import { advance, parseBoard, serializeBoard } from '../src/lib/life';
test('a blinker returns after two simultaneous generations', () => {
  const board = parseBoard('.....\n.....\n.OOO.\n.....\n.....');
  assert.equal(serializeBoard(advance(board, false)), '.....\n..O..\n..O..\n..O..\n.....');
  assert.deepEqual(advance(advance(board, false), false), board);
});
test('a block stays stable and isolated cells die', () => {
  const block = parseBoard('....\n.OO.\n.OO.\n....');
  assert.deepEqual(advance(block, false), block);
  assert.equal(
    advance(parseBoard('...\n.O.\n...'), false).cells.reduce((a, b) => a + b, 0),
    0,
  );
});
test('periodic boundaries connect opposite board edges', () => {
  const board = parseBoard('O...O\n.....\n.....\n.....\nO....');
  assert.equal(advance(board, true).cells[24], 1);
  assert.equal(advance(board, false).cells[24], 0);
});
test('output format round trips and malformed or oversized files are rejected', () => {
  const board = parseBoard('O.\n.O\n');
  assert.deepEqual(parseBoard(serializeBoard(board)), board);
  for (const text of ['', 'O.\nO', 'hello', 'O'.repeat(513)]) assert.throws(() => parseBoard(text));
});
