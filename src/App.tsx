import { useCallback, useEffect, useRef, useState } from 'react';
import { CARDS, PLAYERS } from './data/cards';
import { newPlayers } from './domain/score';
import type { Player } from './domain/types';
import { load, save } from './lib/storage';
import { CardView } from './components/CardView';
import { Scoreboard } from './components/Scoreboard';
import { Heart, HeartDefs } from './components/Icons';
import { UpdatePrompt } from './components/UpdatePrompt';

const last = CARDS.length - 1;

export function App() {
  const [idx, setIdx] = useState(() => Math.min(Math.max(load('gc-idx', 0), 0), last));
  const [flipped, setFlipped] = useState(false);
  const [players, setPlayers] = useState<Player[]>(() => load('gc-players-v2', newPlayers(PLAYERS)));
  const [sheetOpen, setSheetOpen] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => save('gc-idx', idx), [idx]);
  useEffect(() => save('gc-players-v2', players), [players]);

  const go = useCallback((i: number) => {
    if (i < 0 || i > last) return;
    setIdx(i);
    setFlipped(false);
  }, []);

  useEffect(() => {
    if (sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft') go(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, idx, sheetOpen]);

  const closeSheet = useCallback(() => setSheetOpen(false), []);

  return (
    <div className="app">
      <HeartDefs />
      <div className="garland" aria-hidden="true">
        {CARDS.map((c, i) => (
          <i key={c.num} className={`flag${i <= idx ? ' on' : ''}${i === idx ? ' cur' : ''}`} />
        ))}
      </div>

      <header>
        <div className="brand">
          <Heart />
          <div className="brand-name">
            Gløgg Crawl<small>KØBENHAVN · FREDAG 27.11</small>
          </div>
        </div>
        <button className="btn" type="button" onClick={() => setSheetOpen(true)}>
          Punkty
        </button>
      </header>

      <main
        className="stage"
        aria-live="polite"
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const t = touch.current;
          touch.current = null;
          if (!t) return;
          const dx = e.changedTouches[0].clientX - t.x;
          const dy = e.changedTouches[0].clientY - t.y;
          if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) go(idx + (dx < 0 ? 1 : -1));
        }}
      >
        <CardView key={idx} card={CARDS[idx]} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
      </main>

      <footer>
        <button className="btn" type="button" aria-label="Poprzednia karta" disabled={idx === 0} onClick={() => go(idx - 1)}>
          ←
        </button>
        <div className="dots">
          {CARDS.map((c, i) => (
            <button
              key={c.num}
              type="button"
              className={`dot${i === idx ? ' cur' : i < idx ? ' done' : ''}`}
              aria-label={`Karta ${i + 1}: ${c.name}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button className="btn" type="button" aria-label="Następna karta" disabled={idx === last} onClick={() => go(idx + 1)}>
          →
        </button>
      </footer>

      {sheetOpen && <Scoreboard players={players} onChange={setPlayers} onClose={closeSheet} />}
      <UpdatePrompt />
    </div>
  );
}
