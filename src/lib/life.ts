export type Board = { width: number; height: number; cells: number[] };
export function parseBoard(text: string): Board {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.length > 0);
  const width = lines[0]?.length || 0;
  if (!width || lines.some((line) => line.length !== width || /[^.O01X#]/.test(line)))
    throw new Error(
      'Use equal-length rows of . or 0 for dead cells and O, 1, X, or # for live cells.',
    );
  if (width > 512 || lines.length > 512)
    throw new Error('Please use a board no larger than 512 × 512.');
  return {
    width,
    height: lines.length,
    cells: lines.flatMap((line) => Array.from(line, (c) => (/[O1X#]/.test(c) ? 1 : 0))),
  };
}
export function advance(board: Board, wrap: boolean): Board {
  const { width, height, cells } = board;
  const next = cells.map((alive, index) => {
    const x = index % width,
      y = Math.floor(index / width);
    let count = 0;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        let nx = x + dx,
          ny = y + dy;
        if (wrap) {
          nx = (nx + width) % width;
          ny = (ny + height) % height;
        }
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) count += cells[ny * width + nx];
      }
    return count === 3 || (alive && count === 2) ? 1 : 0;
  });
  return { width, height, cells: next };
}
export function preset(name: string): Board {
  const board: Board = { width: 64, height: 40, cells: Array(64 * 40).fill(0) };
  if (name === 'random') board.cells = board.cells.map(() => (Math.random() < 0.28 ? 1 : 0));
  else {
    const points =
      name === 'blinker'
        ? [
            [0, 0],
            [1, 0],
            [2, 0],
          ]
        : [
            [1, 0],
            [2, 1],
            [0, 2],
            [1, 2],
            [2, 2],
          ];
    for (const [x, y] of points) board.cells[(y + 16) * board.width + x + 28] = 1;
  }
  return board;
}
export function serializeBoard(board: Board) {
  return Array.from({ length: board.height }, (_, y) =>
    board.cells
      .slice(y * board.width, (y + 1) * board.width)
      .map((c) => (c ? 'O' : '.'))
      .join(''),
  ).join('\n');
}
