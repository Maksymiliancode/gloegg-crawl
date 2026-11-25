/** Plecione serduszko julehjerte: czerwono-białe pola obrócone o 45° i przycięte do kształtu serca. */
export function Heart({ className = 'heart' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" fill="url(#weave)" clipPath="url(#heartClip)" />
    </svg>
  );
}

/** Wspólne definicje dla serduszek, wstawiane raz na stronę. */
export function HeartDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
          <path d="M.5 .93 C.2 .7 .04 .52 .04 .32 C.04 .16 .16 .05 .3 .05 C.4 .05 .46 .11 .5 .19 C.54 .11 .6 .05 .7 .05 C.84 .05 .96 .16 .96 .32 C.96 .52 .8 .7 .5 .93 Z" />
        </clipPath>
        <pattern id="weave" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45 50 50)">
          <rect width="22" height="22" fill="#fbf4e6" />
          <rect width="11" height="11" fill="#c8102e" />
          <rect x="11" y="11" width="11" height="11" fill="#c8102e" />
        </pattern>
      </defs>
    </svg>
  );
}

/** Czerwone rogi renifera z dzwoneczkami: kara za przegrany wyścig na łyżwach. */
export function Antlers({ className = 'antlers', label }: { className?: string; label?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 44" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <g fill="none" stroke="#c8102e" strokeWidth="4" strokeLinecap="round">
        <path d="M10 40 Q32 28 54 40" stroke="#8f0b20" />
        <path d="M19 35 C17 25 13 16 8 5" />
        <path d="M15 22 L5 17" />
        <path d="M17 29 L8 29" />
        <path d="M45 35 C47 25 51 16 56 5" />
        <path d="M49 22 L59 17" />
        <path d="M47 29 L56 29" />
      </g>
      <g fill="#d4a548">
        <circle cx="19" cy="39" r="4" />
        <circle cx="45" cy="39" r="4" />
      </g>
      <g fill="#6b4a12">
        <circle cx="19" cy="41" r="1.2" />
        <circle cx="45" cy="41" r="1.2" />
      </g>
    </svg>
  );
}
