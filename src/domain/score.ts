import type { Player, StopCard } from './types';

export function newPlayers(names: string[]): Player[] {
  return names.map((name) => ({ name, score: 0, antlers: false }));
}

export function addPoints(players: Player[], index: number, delta: number): Player[] {
  return players.map((p, i) => (i === index ? { ...p, score: p.score + delta } : p));
}

/** Rogi nosi najwyżej jedna osoba. Ponowne dotknięcie u tej samej osoby je zdejmuje. */
export function toggleAntlers(players: Player[], index: number): Player[] {
  const wearing = players[index]?.antlers ?? false;
  return players.map((p, i) => ({ ...p, antlers: i === index ? !wearing : false }));
}

export function addPlayer(players: Player[], name: string): Player[] {
  const clean = name.trim();
  if (!clean) return players;
  return [...players, { name: clean, score: 0, antlers: false }];
}

export function removePlayer(players: Player[], index: number): Player[] {
  return players.filter((_, i) => i !== index);
}

/** Ranking malejąco po punktach; przy remisie zostaje kolejność dodania. Zwraca też indeks w tablicy źródłowej. */
export function ranking(players: Player[]): (Player & { index: number })[] {
  return players
    .map((p, index) => ({ ...p, index }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
}

export const pinUrl = (c: StopCard) =>
  `https://www.google.com/maps/search/?api=1&query=${c.pin}`;

export const routeUrl = (c: StopCard) =>
  `https://www.google.com/maps/dir/?api=1&destination=${c.pin}&travelmode=${c.mode}`;
