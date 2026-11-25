import { useEffect, useState } from 'react';
import type { Player } from '../domain/types';
import { addPlayer, addPoints, ranking, removePlayer, toggleAntlers } from '../domain/score';
import { Antlers } from './Icons';

interface Props {
  players: Player[];
  onChange: (players: Player[]) => void;
  onClose: () => void;
}

const DELTAS = [-1, 1, 2, 3];

export function Scoreboard({ players, onChange, onClose }: Props) {
  const [name, setName] = useState('');
  const [confirmRemove, setConfirmRemove] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="sheet-wrap" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">
        <div className="sheet-head">
          <h2 id="sheetTitle">Tabela punktów</h2>
          <button className="icon-btn" type="button" onClick={onClose}>
            Zamknij
          </button>
        </div>
        <p className="legend">
          +1 „Tu trzeba” · +3 / +1 wyzwanie · +2 bonus · −1 kara · +1/+2 za spontaniczne akcje. Punkty liczy jeden
          telefon i tylko na nim zostają. Przycisk „Rogi” wskazuje, kto nosi rogi renifera.
        </p>

        {players.length === 0 && <p className="legend">Nie ma jeszcze graczy. Dodajcie ich poniżej.</p>}
        <ul className="players">
          {ranking(players).map((p, rank) => (
            <li key={p.index}>
              <span className="rank">{rank + 1}</span>
              <span className="name">
                <span>
                  {p.name} {p.antlers && <Antlers className="antlers-sm" label="nosi rogi renifera" />}
                </span>
                <output>{p.score}</output>
              </span>
              <span className="score">
                {DELTAS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={d < 0 ? 'minus' : 'plus'}
                    aria-label={`${d > 0 ? 'Plus' : 'Minus'} ${Math.abs(d)} dla ${p.name}`}
                    onClick={() => onChange(addPoints(players, p.index, d))}
                  >
                    {d > 0 ? `+${d}` : `−${-d}`}
                  </button>
                ))}
                <button
                  type="button"
                  className={`antlers-btn${p.antlers ? ' on' : ''}`}
                  aria-pressed={p.antlers}
                  onClick={() => onChange(toggleAntlers(players, p.index))}
                >
                  Rogi
                </button>
                <button
                  type="button"
                  className="remove"
                  onClick={() => {
                    if (confirmRemove === p.index) {
                      onChange(removePlayer(players, p.index));
                      setConfirmRemove(null);
                    } else setConfirmRemove(p.index);
                  }}
                >
                  {confirmRemove === p.index ? 'dotknij jeszcze raz, żeby usunąć' : 'usuń'}
                </button>
              </span>
            </li>
          ))}
        </ul>

        <form
          className="add"
          onSubmit={(e) => {
            e.preventDefault();
            onChange(addPlayer(players, name));
            setName('');
          }}
        >
          <input
            id="playerName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dodaj gracza"
            autoComplete="off"
            maxLength={40}
          />
          <button className="btn" type="submit">
            Dodaj
          </button>
        </form>
      </section>
    </div>
  );
}
