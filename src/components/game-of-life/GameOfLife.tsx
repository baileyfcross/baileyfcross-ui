'use client';
import { useEffect, useRef, useState } from 'react';
import { advance, parseBoard, preset, serializeBoard, type Board } from '@/lib/life';
import './game-of-life.css';

export default function GameOfLife() {
  const [board, setBoard] = useState<Board>(() => preset('glider'));
  const initial = useRef(board);
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(8);
  const [wrap, setWrap] = useState(true);
  const [grid, setGrid] = useState(true);
  const [zoom, setZoom] = useState(12);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const canvas = useRef<HTMLCanvasElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const paint = useRef<number | null>(null);
  const fileRequest = useRef(0);
  const alive = board.cells.reduce((sum, cell) => sum + cell, 0);
  function step() {
    setBoard((b) => advance(b, wrap));
    setGeneration((g) => g + 1);
  }
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setBoard((b) => advance(b, wrap));
      setGeneration((g) => g + 1);
    }, 1000 / speed);
    return () => clearInterval(timer);
  }, [running, speed, wrap]);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    // CSS variables keep the board in sync with the site's seasonal palette.
    const draw = () => {
      const style = getComputedStyle(el);
      ctx.fillStyle = style.getPropertyValue('--paper-card').trim();
      ctx.fillRect(0, 0, el.width, el.height);
      ctx.fillStyle = style.getPropertyValue('--chrome').trim();
      board.cells.forEach((cell, i) => {
        if (cell)
          ctx.fillRect((i % board.width) * zoom, Math.floor(i / board.width) * zoom, zoom, zoom);
      });
      if (grid && zoom >= 6) {
        ctx.strokeStyle = style.getPropertyValue('--rule').trim();
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let x = 0; x <= board.width; x++) {
          ctx.moveTo(x * zoom, 0);
          ctx.lineTo(x * zoom, el.height);
        }
        for (let y = 0; y <= board.height; y++) {
          ctx.moveTo(0, y * zoom);
          ctx.lineTo(el.width, y * zoom);
        }
        ctx.stroke();
      }
    };
    draw();
    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-season'],
    });
    return () => observer.disconnect();
  }, [board, grid, zoom]);
  function load(next: Board) {
    setRunning(false);
    setGeneration(0);
    setBoard(next);
    initial.current = next;
    setError('');
    const width = viewport.current?.clientWidth || 768;
    setZoom(Math.max(1, Math.min(16, Math.floor((width - 24) / next.width))));
  }
  function importText(value: string) {
    try {
      load(parseBoard(value));
    } catch (e) {
      setError((e as Error).message);
    }
  }
  function edit(event: React.PointerEvent<HTMLCanvasElement>, start = false) {
    if (running) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.floor(((event.clientX - bounds.left) * board.width) / bounds.width);
    const y = Math.floor(((event.clientY - bounds.top) * board.height) / bounds.height);
    if (x < 0 || x >= board.width || y < 0 || y >= board.height) return;
    const index = y * board.width + x;
    if (start) paint.current = board.cells[index] ? 0 : 1;
    if (paint.current === null) return;
    const value = paint.current;
    setBoard((b) => {
      const cells = [...b.cells];
      cells[index] = value;
      const next = { ...b, cells };
      initial.current = next;
      return next;
    });
  }
  function download() {
    const url = URL.createObjectURL(new Blob([serializeBoard(board)], { type: 'text/plain' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lifeout.out';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section className="life-app" aria-label="Interactive Game of Life">
      <div className="life-toolbar">
        <button className="desktop-button" onClick={() => setRunning((v) => !v)}>
          {running ? 'Ⅱ Pause' : '▶ Play'}
        </button>
        <button className="desktop-button" onClick={step} disabled={running}>
          Step →
        </button>
        <button
          className="desktop-button"
          onClick={() => {
            setRunning(false);
            setBoard(initial.current);
            setGeneration(0);
          }}
        >
          Reset ↺
        </button>
        <button
          className="desktop-button"
          onClick={() => load({ ...board, cells: board.cells.map(() => 0) })}
        >
          Clear
        </button>
        <label>
          Pattern{' '}
          <select
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) load(preset(e.target.value));
              e.target.value = '';
            }}
          >
            <option value="" disabled>
              Choose a pattern
            </option>
            <option value="glider">Glider</option>
            <option value="blinker">Blinker</option>
            <option value="random">Random</option>
          </select>
        </label>
      </div>
      <div className="life-stats" aria-live={running ? 'off' : 'polite'}>
        <span>
          GENERATION <strong>{generation.toLocaleString()}</strong>
        </span>
        <span>
          ALIVE <strong>{alive.toLocaleString()}</strong>
        </span>
        <span>
          BOARD{' '}
          <strong>
            {board.width} × {board.height}
          </strong>
        </span>
        <span>
          STATUS <strong>{running ? 'Running' : 'Paused'}</strong>
        </span>
      </div>
      <div className="life-options">
        <label>
          Speed: {speed}/sec{' '}
          <input
            type="range"
            min="1"
            max="30"
            value={speed}
            onChange={(e) => setSpeed(+e.target.value)}
          />
        </label>
        <label>
          Zoom: {zoom}px{' '}
          <input
            type="range"
            min="1"
            max="24"
            value={zoom}
            onChange={(e) => setZoom(+e.target.value)}
          />
        </label>
        <label>
          <input type="checkbox" checked={grid} onChange={(e) => setGrid(e.target.checked)} /> Grid
        </label>
        <label>
          <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} /> Wrap
          edges
        </label>
        <button
          className="desktop-button"
          onClick={() =>
            setZoom(
              Math.max(
                1,
                Math.min(
                  24,
                  Math.floor(((viewport.current?.clientWidth || 768) - 24) / board.width),
                ),
              ),
            )
          }
        >
          Fit board
        </button>
      </div>
      <div className="life-viewport" ref={viewport}>
        <canvas
          ref={canvas}
          width={board.width * zoom}
          height={board.height * zoom}
          aria-label={`${board.width} by ${board.height} Game of Life board. Pause to draw cells, or import a text board below.`}
          onPointerDown={(e) => {
            if (e.button !== 0) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            edit(e, true);
          }}
          onPointerMove={(e) => edit(e)}
          onPointerUp={() => {
            paint.current = null;
          }}
          onPointerCancel={() => {
            paint.current = null;
          }}
          onLostPointerCapture={() => {
            paint.current = null;
          }}
        />
      </div>
      <p className="life-hint">
        Pause to draw or erase cells. Scroll to explore a zoomed board. Reset returns to your
        starting pattern.
      </p>
      <details className="life-import">
        <summary>Import or export a board / lifeout.out</summary>
        <p>
          Load output from my MPI + CUDA project, or paste a board below. Files stay in your
          browser. Maximum: 512 × 512 cells.
        </p>
        <label>
          Board file{' '}
          <input
            type="file"
            accept=".out,.txt"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = '';
              if (!file) return;
              const request = ++fileRequest.current;
              if (file.size > 1024 * 1024) {
                setError('Please choose a text file smaller than 1 MB.');
                return;
              }
              try {
                const value = await file.text();
                if (request === fileRequest.current) {
                  setText(value);
                  importText(value);
                }
              } catch {
                setError('This file could not be read. Please try another text file.');
              }
            }}
          />
        </label>
        <label htmlFor="life-text">Board text</label>
        <textarea
          id="life-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={'Copy board text here: O = alive, . = dead'}
          spellCheck={false}
        />
        <div className="life-toolbar">
          <button className="desktop-button" onClick={() => importText(text)}>
            Load text
          </button>
          <button className="desktop-button" onClick={download}>
            Download lifeout.out ↓
          </button>
        </div>
        {error && <p role="alert">{error}</p>}
      </details>
      <details className="life-import">
        <summary>How it works</summary>
        <p>
          Each cell has eight neighbors. A live cell survives with two or three live neighbors. A
          dead cell becomes alive with exactly three. Every generation updates all cells together.
          Wrap edges connects opposite sides of the board.
        </p>
        <p>
          This browser simulation uses the same Conway rules as my parallel computing project. The
          MPI and CUDA program runs separately on AiMOS; you can explore its text output here.
        </p>
        <a href="https://github.com/baileyfcross/mpi-game-of-life" target="_blank" rel="noreferrer">
          Explore the source repository ↗
        </a>
      </details>
    </section>
  );
}
