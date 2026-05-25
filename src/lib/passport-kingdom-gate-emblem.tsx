type PassportKingdomGateEmblemProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/** Inline arch / dog-cat kingdom gate — always export-safe (no external assets). */
export function PassportKingdomGateEmblem({
  x,
  y,
  width,
  height,
}: PassportKingdomGateEmblemProps) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${width / 320} ${height / 280})`}
      opacity={0.92}
    >
      <path
        d="M36 248V98c0-36 58-68 124-68s124 32 124 68v150"
        fill="none"
        stroke="#c9a45c"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <path
        d="M52 248V108c0-28 48-52 108-52s108 24 108 52v140"
        fill="rgba(201,164,92,0.06)"
        stroke="#c9a45c"
        strokeWidth={1.1}
        opacity={0.85}
      />
      <line x1={36} y1={248} x2={284} y2={248} stroke="#c9a45c" strokeWidth={1.4} opacity={0.75} />
      <rect x={48} y={248} width={18} height={22} fill="none" stroke="#c9a45c" strokeWidth={1.1} />
      <rect x={254} y={248} width={18} height={22} fill="none" stroke="#c9a45c" strokeWidth={1.1} />

      <path
        d="M118 206c-10-18-8-38 6-52 8-8 18-12 28-12 10 0 20 4 28 12 14 14 16 34 6 52"
        fill="rgba(201,164,92,0.1)"
        stroke="#c9a45c"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <circle cx={128} cy={152} r={5} fill="#c9a45c" opacity={0.85} />
      <circle cx={148} cy={152} r={5} fill="#c9a45c" opacity={0.85} />
      <path
        d="M136 164c-6 6-6 14 0 20 6-6 6-14 0-20z"
        fill="none"
        stroke="#c9a45c"
        strokeWidth={1}
      />
      <path d="M124 138c6-10 16-14 24-10" fill="none" stroke="#c9a45c" strokeWidth={1} />
      <path d="M152 138c-6-10-16-14-24-10" fill="none" stroke="#c9a45c" strokeWidth={1} />

      <path
        d="M196 206c-8-16-4-34 8-46 6-6 14-10 22-10s16 4 22 10c12 12 16 30 8 46"
        fill="rgba(201,164,92,0.1)"
        stroke="#c9a45c"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <circle cx={206} cy={152} r={4.5} fill="#c9a45c" opacity={0.85} />
      <circle cx={222} cy={152} r={4.5} fill="#c9a45c" opacity={0.85} />
      <path
        d="M206 158l8 10 8-10"
        fill="none"
        stroke="#c9a45c"
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <path d="M200 136l6-8 6 4" fill="none" stroke="#c9a45c" strokeWidth={1} />
      <path d="M228 136l-6-8-6 4" fill="none" stroke="#c9a45c" strokeWidth={1} />

      <path
        d="M160 58l10 16 18 2-13 12 4 18-19-10-19 10 4-18-13-12 18-2z"
        fill="none"
        stroke="#c9a45c"
        strokeWidth={1.1}
        strokeLinejoin="round"
        opacity={0.9}
      />
      <path
        d="M160 86v28"
        fill="none"
        stroke="#c9a45c"
        strokeWidth={0.9}
        opacity={0.55}
      />
      <path
        d="M96 118h128"
        fill="none"
        stroke="#c9a45c"
        strokeWidth={0.75}
        opacity={0.35}
      />
    </g>
  );
}
