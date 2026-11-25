import { describe, expect, it } from 'vitest';
import { addPlayer, addPoints, newPlayers, pinUrl, ranking, removePlayer, routeUrl, toggleAntlers } from './score';
import { CARDS, PLAYERS } from '../data/cards';
import type { StopCard } from './types';

describe('punkty', () => {
  it('dodaje i odejmuje punkty tylko wskazanej osobie', () => {
    let p = newPlayers(['A', 'B']);
    p = addPoints(p, 1, 3);
    p = addPoints(p, 1, -1);
    expect(p.map((x) => x.score)).toEqual([0, 2]);
  });

  it('rogi nosi tylko jedna osoba, a drugie dotknięcie je zdejmuje', () => {
    let p = newPlayers(['A', 'B', 'C']);
    p = toggleAntlers(p, 0);
    p = toggleAntlers(p, 2);
    expect(p.map((x) => x.antlers)).toEqual([false, false, true]);
    p = toggleAntlers(p, 2);
    expect(p.some((x) => x.antlers)).toBe(false);
  });

  it('ranking sortuje po punktach, remis zostawia kolejność', () => {
    let p = newPlayers(['A', 'B', 'C']);
    p = addPoints(p, 2, 5);
    p = addPoints(p, 0, 1);
    p = addPoints(p, 1, 1);
    expect(ranking(p).map((x) => x.name)).toEqual(['C', 'A', 'B']);
    expect(ranking(p)[0].index).toBe(2);
  });

  it('nie dodaje pustego gracza i usuwa wskazanego', () => {
    let p = newPlayers(['A']);
    p = addPlayer(p, '   ');
    p = addPlayer(p, ' Zosia ');
    expect(p.map((x) => x.name)).toEqual(['A', 'Zosia']);
    expect(removePlayer(p, 0).map((x) => x.name)).toEqual(['Zosia']);
  });
});

describe('karty', () => {
  const stops = CARDS.filter((c): c is StopCard => c.kind === 'stop');

  it('jest 7 przystanków, a gra startuje z czterema graczami', () => {
    expect(stops).toHaveLength(7);
    expect(PLAYERS).toHaveLength(4);
  });

  it('każdy przystanek ma wyzwanie z karą, bonus i co najmniej jedną rzecz dla wszystkich', () => {
    for (const s of stops) {
      expect(s.back.must.length, s.name).toBeGreaterThan(0);
      expect(s.back.duel.text, s.name).not.toBe('');
      expect(s.back.duel.penalty, s.name).not.toBe('');
      expect(s.back.bonus, s.name).not.toBe('');
    }
  });

  it('pinezki leżą w centrum Kopenhagi i dają poprawne linki', () => {
    for (const s of stops) {
      const [lat, lng] = s.pin.split(',').map(Number);
      expect(lat, s.name).toBeGreaterThan(55.66);
      expect(lat, s.name).toBeLessThan(55.69);
      expect(lng, s.name).toBeGreaterThan(12.55);
      expect(lng, s.name).toBeLessThan(12.6);
      expect(pinUrl(s)).toContain(`query=${s.pin}`);
      expect(routeUrl(s)).toContain(`travelmode=${s.mode}`);
    }
  });

  it('rogi zaczynają się w Aamanns i przechodzą dalej', () => {
    expect(stops[0].back.duel.antlers).toBe(true);
    expect(stops.filter((s) => s.back.duel.antlers).length).toBeGreaterThan(1);
  });

  it('nigdzie nie została stara czapka Mikołaja', () => {
    expect(JSON.stringify(CARDS).toLowerCase()).not.toMatch(/czapk|nissehue/);
  });
});
