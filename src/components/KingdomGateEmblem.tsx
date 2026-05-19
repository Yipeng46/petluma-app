type KingdomGateEmblemProps = {
  className?: string;
};

function FourPointStar({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <path
      d={`M ${cx} ${cy - r} L ${cx + r * 0.28} ${cy - r * 0.28} L ${cx + r} ${cy} L ${cx + r * 0.28} ${cy + r * 0.28} L ${cx} ${cy + r} L ${cx - r * 0.28} ${cy + r * 0.28} L ${cx - r} ${cy} L ${cx - r * 0.28} ${cy - r * 0.28} Z`}
      fill="currentColor"
      stroke="none"
    />
  );
}

export function KingdomGateEmblem({ className = "" }: KingdomGateEmblemProps) {
  return (
    <svg
      viewBox="0 0 220 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g className="passport-emblem-gold" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 252 H194" strokeWidth="0.95" opacity="0.88" />
        <path d="M32 256 H188" strokeWidth="0.72" opacity="0.62" />
        <path d="M38 260 H182" strokeWidth="0.55" opacity="0.45" />

        <path
          d="M42 252 V120 C42 70 68 40 110 40 C152 40 178 70 178 120 V252"
          strokeWidth="1.25"
        />
        <path
          d="M50 252 V124 C50 78 72 52 110 52 C148 52 170 78 170 124 V252"
          strokeWidth="0.78"
          opacity="0.5"
        />

        <path d="M96 40 L110 18 L124 40" strokeWidth="1.05" />
        <path d="M102 28 H118" strokeWidth="0.8" />
        <path d="M106 22 H114" strokeWidth="0.65" opacity="0.75" />
        <circle cx="110" cy="24" r="2.4" fill="currentColor" stroke="none" />
        <path
          d="M104 34 L106 30 L110 32 L114 30 L116 34"
          strokeWidth="0.7"
          fill="currentColor"
          stroke="none"
        />

        <path
          d="M110 72 L120 88 L138 90 L125 102 L128 120 L110 112 L92 120 L95 102 L82 90 L100 88 Z"
          fill="currentColor"
          stroke="none"
        />
        <FourPointStar cx={82} cy={112} r={3.2} />
        <FourPointStar cx={138} cy={112} r={3.2} />
        <FourPointStar cx={68} cy={132} r={2.4} />
        <FourPointStar cx={152} cy={132} r={2.4} />
        <FourPointStar cx={110} cy={142} r={2.2} />
        <circle cx="74" cy="152" r="1.2" fill="currentColor" stroke="none" opacity="0.85" />
        <circle cx="146" cy="152" r="1.2" fill="currentColor" stroke="none" opacity="0.85" />

        <path
          d="M72 218 C72 204 82 196 94 196 C102 196 107 201 110 208 C113 201 118 196 126 196 C138 196 148 204 148 218 C148 232 138 242 126 242 L94 242 C82 242 72 232 72 218 Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M118 218 C118 204 128 196 140 196 C152 196 162 204 162 218 C162 232 152 242 140 242 L118 242 Z"
          fill="currentColor"
          stroke="none"
        />
        <ellipse cx="94" cy="214" rx="5.5" ry="3.2" className="passport-emblem-cutout" stroke="none" />
        <ellipse cx="140" cy="214" rx="5.5" ry="3.2" className="passport-emblem-cutout" stroke="none" />
        <path
          d="M94 196 L94 188 C94 182 98 178 104 178 C108 178 110 180 110 184"
          strokeWidth="0.85"
          opacity="0.55"
        />
        <path
          d="M126 196 L126 188 C126 182 122 178 116 178 C112 178 110 180 110 184"
          strokeWidth="0.85"
          opacity="0.55"
        />
      </g>
    </svg>
  );
}
