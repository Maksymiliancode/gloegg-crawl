import type { Card, InfoCard, StopCard } from '../domain/types';
import { pinUrl, routeUrl } from '../domain/score';
import { PLAYERS } from '../data/cards';
import { Antlers, Heart } from './Icons';

interface Props {
  card: Card;
  flipped: boolean;
  onFlip: () => void;
}

export function CardView({ card, flipped, onFlip }: Props) {
  return (
    <div className={`card${flipped ? ' flipped' : ''}`}>
      <div className="face front" aria-hidden={flipped}>
        <div className="front-top">
          <Heart />
          <div className="num">{card.num}</div>
          <h2>{card.name}</h2>
          <div className="sub">{card.sub}</div>
        </div>
        <div className="front-body">
          {card.kind === 'stop' ? <StopFront card={card} /> : <InfoFront card={card} />}
          {card.note && <p className="note">{card.note}</p>}
          {card.kind !== 'home' && (
            <div className="front-actions">
              {card.kind === 'stop' && (
                <a className="btn" href={routeUrl(card)} target="_blank" rel="noopener">
                  Prowadź mnie tam
                </a>
              )}
              <button className="btn solid" type="button" onClick={onFlip}>
                {card.kind === 'stop' ? 'Jesteśmy! Odwróć kartę' : card.cta}
              </button>
            </div>
          )}
        </div>
      </div>

      {(card.kind === 'stop' || card.back) && (
        <div className="face back" aria-hidden={!flipped}>
          <div className="back-head">
            <div>
              <div className="num">
                {card.num} · {card.name}
              </div>
              <h3>{card.back?.title}</h3>
            </div>
            <button className="icon-btn" type="button" onClick={onFlip}>
              Przód
            </button>
          </div>
          <div className="back-body">{card.kind === 'stop' ? <StopBack card={card} /> : <IntroBack card={card} />}</div>
        </div>
      )}
    </div>
  );
}

function StopFront({ card }: { card: StopCard }) {
  return (
    <>
      <dl className="meta">
        <dt>Kiedy</dt>
        <dd className="time">{card.time}</dd>
        <dt>Adres</dt>
        <dd>
          <a className="addr" href={pinUrl(card)} target="_blank" rel="noopener">
            {card.address}
          </a>
        </dd>
      </dl>
      <div className="sec">
        <h4>Jak dojść</h4>
        <ul className="route">
          {card.route.map(([leg, text]) => (
            <li key={leg + text}>
              <span className="leg">{leg}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function InfoFront({ card }: { card: InfoCard }) {
  return (
    <>
      <dl className="meta">
        <dt>Kiedy</dt>
        <dd className="time">{card.time}</dd>
        {card.rows.map(([k, v]) => (
          <Row key={k} k={k} v={v} />
        ))}
      </dl>
      {card.kind === 'intro' && (
        <div className="players-chips">
          {PLAYERS.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      )}
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt>{k}</dt>
      <dd>{v}</dd>
    </>
  );
}

function StopBack({ card }: { card: StopCard }) {
  const b = card.back;
  return (
    <>
      <div className="sec">
        <h4>
          Tu trzeba, wszyscy <b>+1 za całą listę</b>
        </h4>
        <ul className="must">
          {b.must.map(([what, why]) => (
            <li key={what}>
              <span>
                <b>{what}</b>
                <span>{why}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="sec">
        <h4>
          Wyzwanie <b>1. +3 · 2. +1</b>
        </h4>
        <div className="box duel">
          <h5>
            {b.duel.title}
            {b.duel.antlers && <Antlers className="antlers-badge" label="przegrany przejmuje rogi" />}
          </h5>
          <p>{b.duel.text}</p>
          <p className="penalty">
            <b>Kara:</b> {b.duel.penalty}
          </p>
        </div>
      </div>
      <div className="sec">
        <h4>
          Bonus <b>+2</b>
        </h4>
        <div className="box bonus">
          <p>{b.bonus}</p>
        </div>
      </div>
    </>
  );
}

function IntroBack({ card }: { card: InfoCard }) {
  if (!card.back) return null;
  return (
    <>
      <div className="sec">
        <h4>Zasady</h4>
        <ul className="must">
          {card.back.rules.map(([k, v]) => (
            <li key={k}>
              <span>
                <b>{k}</b>
                <span>{v}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="sec">
        <h4>Słowniczek</h4>
        <dl className="phrases">
          {card.back.phrases.map(([da, pl, say]) => (
            <Phrase key={da} da={da} pl={pl} say={say} />
          ))}
        </dl>
      </div>
    </>
  );
}

function Phrase({ da, pl, say }: { da: string; pl: string; say: string }) {
  return (
    <>
      <dt>{da}</dt>
      <dd>
        {pl}
        <i>{say}</i>
      </dd>
    </>
  );
}
