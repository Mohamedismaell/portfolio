import * as React from "react";

type HeroIllustrationProps = React.SVGProps<SVGSVGElement> & {
  accent?: string;
};

export default function HeroIllustration({
  className,
  accent = "var(--accent)",
  ...props
}: HeroIllustrationProps) {
  return (
    <svg
      viewBox="0 0 760 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Mobile app workflow illustration"
      role="img"
      {...props}
    >
      <defs>
        <linearGradient id="phoneFrame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="22%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="82%" stopColor="rgba(0,0,0,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
        </linearGradient>

        <linearGradient id="screenLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
          <stop offset="100%" stopColor="rgba(255,248,238,0.92)" />
        </linearGradient>

        <radialGradient id="pedestalGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        <linearGradient id="pedestalTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,250,243,0.98)" />
          <stop offset="100%" stopColor="rgba(232,214,191,0.95)" />
        </linearGradient>

        <linearGradient id="pedestalSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(216,194,167,0.92)" />
          <stop offset="100%" stopColor="rgba(170,145,116,0.95)" />
        </linearGradient>

        <filter id="shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" floodOpacity="0.28" />
        </filter>

        <filter id="blur">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <ellipse
        cx="380"
        cy="430"
        rx="250"
        ry="28"
        fill="currentColor"
        opacity="0.16"
        filter="url(#blur)"
      />

      <ellipse cx="395" cy="392" rx="235" ry="50" fill="url(#pedestalSide)" />
      <ellipse cx="395" cy="376" rx="235" ry="54" fill="url(#pedestalTop)" />
      <ellipse cx="395" cy="376" rx="180" ry="24" fill="url(#pedestalGlow)" />

      <path
        d="M98 270C135 222 127 171 74 124"
        stroke={accent}
        strokeOpacity="0.45"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
      <path
        d="M125 306C164 276 162 245 128 226C98 210 74 231 79 258C82 275 97 286 118 285"
        stroke={accent}
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />

      <path
        d="M68 114L102 126L83 145L68 114Z"
        fill={accent}
        fillOpacity="0.3"
      />
      <path
        d="M100 125L114 108L85 145L100 125Z"
        fill={accent}
        fillOpacity="0.5"
      />

      <ellipse
        cx="335"
        cy="250"
        rx="170"
        ry="122"
        stroke="currentColor"
        opacity="0.08"
        strokeWidth="2"
      />
      <ellipse
        cx="490"
        cy="252"
        rx="170"
        ry="122"
        stroke="currentColor"
        opacity="0.08"
        strokeWidth="2"
      />

      <g transform="translate(200 48) rotate(4 76 180)" filter="url(#shadow)">
        <rect x="0" y="0" width="152" height="360" rx="34" fill="url(#phoneFrame)" />
        <rect x="7" y="7" width="138" height="346" rx="28" fill="rgba(10,10,10,0.96)" />
        <rect x="12" y="12" width="128" height="336" rx="24" fill="url(#screenLight)" />

        <rect x="50" y="16" width="52" height="14" rx="7" fill="rgba(8,8,8,0.96)" />
        <text x="22" y="25" fontSize="8" fontWeight="700" fill="rgba(24,24,24,0.82)">
          9:41
        </text>

        <line x1="38" y1="126" x2="76" y2="92" stroke={accent} strokeOpacity="0.42" strokeWidth="1.7" />
        <line x1="76" y1="92" x2="113" y2="126" stroke={accent} strokeOpacity="0.42" strokeWidth="1.7" />
        <line x1="38" y1="126" x2="38" y2="210" stroke={accent} strokeOpacity="0.42" strokeWidth="1.7" />
        <line x1="113" y1="126" x2="113" y2="210" stroke={accent} strokeOpacity="0.42" strokeWidth="1.7" />
        <line x1="38" y1="210" x2="76" y2="282" stroke={accent} strokeOpacity="0.42" strokeWidth="1.7" />
        <line x1="113" y1="210" x2="76" y2="282" stroke={accent} strokeOpacity="0.42" strokeWidth="1.7" />
        <line x1="76" y1="92" x2="76" y2="168" stroke={accent} strokeOpacity="0.24" strokeWidth="1.4" />
        <line x1="76" y1="168" x2="76" y2="282" stroke={accent} strokeOpacity="0.24" strokeWidth="1.4" />

        {[
          [38, 126],
          [76, 92],
          [113, 126],
          [38, 210],
          [113, 210],
          [76, 282],
          [76, 168],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill={accent} fillOpacity="0.85" />
        ))}

        <g transform="translate(51 48)">
          <rect width="50" height="50" rx="14" fill="rgba(255,255,255,0.88)" stroke="rgba(210,188,160,0.65)" />
          <path
            d="M20 17C22 12 29 12 31 17C33 22 28 24 28 27C28 29 31 30 31 33C31 37 28 40 25.5 40C23 40 20 37 20 33C20 30 23 29 23 27C23 24 18 22 20 17Z"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="25" y="64" textAnchor="middle" fontSize="10" fontWeight="800" fill="currentColor">
            AI
          </text>
        </g>

        <g transform="translate(16 112)">
          <rect width="42" height="52" rx="12" fill="rgba(255,255,255,0.9)" stroke="rgba(210,188,160,0.65)" />
          <path
            d="M21 16C26 16 30 20 30 25C30 32 21 38 21 38C21 38 12 32 12 25C12 20 16 16 21 16Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <circle cx="21" cy="25" r="2.5" fill="currentColor" opacity="0.8" />
          <text x="21" y="66" textAnchor="middle" fontSize="9" fontWeight="800" fill="currentColor">
            Maps
          </text>
        </g>

        <g transform="translate(96 112)">
          <rect width="40" height="52" rx="12" fill="rgba(255,255,255,0.9)" stroke="rgba(210,188,160,0.65)" />
          <path
            d="M20 16L29 20V28C29 34 24 39 20 42C16 39 11 34 11 28V20L20 16Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path d="M20 22V28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <text x="20" y="66" textAnchor="middle" fontSize="9" fontWeight="800" fill="currentColor">
            Auth
          </text>
        </g>

        <g transform="translate(14 214)">
          <rect width="44" height="52" rx="12" fill="rgba(255,255,255,0.9)" stroke="rgba(210,188,160,0.65)" />
          <rect x="12" y="14" width="20" height="13" rx="2.5" stroke="currentColor" strokeWidth="2.2" />
          <path d="M12 21H32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <text x="22" y="66" textAnchor="middle" fontSize="8.7" fontWeight="800" fill="currentColor">
            Pay
          </text>
        </g>

        <g transform="translate(97 214)">
          <rect width="40" height="52" rx="12" fill="rgba(255,255,255,0.9)" stroke="rgba(210,188,160,0.65)" />
          <ellipse cx="20" cy="18" rx="9" ry="4.5" stroke="currentColor" strokeWidth="2.2" />
          <path d="M11 18V30C11 33 15 35 20 35C25 35 29 33 29 30V18" stroke="currentColor" strokeWidth="2.2" />
          <text x="20" y="66" textAnchor="middle" fontSize="8.7" fontWeight="800" fill="currentColor">
            DB
          </text>
        </g>

        <g transform="translate(51 270)">
          <rect width="50" height="54" rx="14" fill="rgba(255,255,255,0.9)" stroke="rgba(210,188,160,0.65)" />
          <path d="M16 34V24M25 34V18M34 34V14M12 34H38" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <text x="25" y="69" textAnchor="middle" fontSize="8.7" fontWeight="800" fill="currentColor">
            Analytics
          </text>
        </g>

        <circle cx="76" cy="168" r="28" fill="rgba(255,250,244,0.96)" stroke="rgba(210,188,160,0.72)" />
        <path
          d="M76 150L92 168L76 186L60 168L76 150Z"
          fill={accent}
          fillOpacity="0.48"
        />
      </g>

      <g transform="translate(390 44) rotate(2 78 182)" filter="url(#shadow)">
        <rect x="0" y="0" width="156" height="364" rx="34" fill="url(#phoneFrame)" />
        <rect x="7" y="7" width="142" height="350" rx="28" fill="rgba(10,10,10,0.96)" />
        <rect x="12" y="12" width="132" height="340" rx="24" fill="url(#screenLight)" />

        <rect x="50" y="16" width="54" height="14" rx="7" fill="rgba(8,8,8,0.96)" />
        <text x="20" y="25" fontSize="8" fontWeight="700" fill="rgba(24,24,24,0.82)">
          9:41
        </text>

        <rect
          x="18"
          y="38"
          width="110"
          height="22"
          rx="11"
          fill="rgba(255,255,255,0.86)"
          stroke="rgba(210,188,160,0.55)"
        />
        <circle cx="31" cy="49" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M34.5 52.5L38 56" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <text x="47" y="52" fontSize="6.8" fontWeight="600" fill="currentColor" opacity="0.56">
          Search locations...
        </text>

        <path
          d="M54 86C85 99 93 124 68 149C46 171 50 194 79 220C103 241 101 267 62 297"
          stroke={accent}
          strokeOpacity="0.46"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="5 7"
        />

        <g fill="rgba(255,255,255,0.92)" stroke="rgba(210,188,160,0.55)">
          <rect x="57" y="70" width="48" height="30" rx="10" />
          <rect x="101" y="125" width="54" height="30" rx="10" />
          <rect x="18" y="169" width="64" height="30" rx="10" />
          <rect x="100" y="214" width="66" height="30" rx="10" />
          <rect x="58" y="259" width="54" height="30" rx="10" />
          <rect x="18" y="303" width="64" height="30" rx="10" />
          <rect x="79" y="344" width="54" height="30" rx="10" />
        </g>

        {[
          [66, 79, "1. Idea", "Discovery"],
          [110, 134, "2. Design", "UI/UX"],
          [27, 178, "3. Architecture", "Structure"],
          [109, 223, "4. Development", "Code"],
          [67, 268, "5. Testing", "Quality"],
          [27, 312, "6. Deployment", "Release"],
          [88, 353, "7. Launch", "Live"],
        ].map(([x, y, a, b], i) => (
          <g key={i}>
            <path
              d={`M${x} ${y + 4}C${x + 5} ${y - 2} ${x + 14} ${y - 2} ${x + 14} ${y + 6}C${x + 14} ${y + 14} ${x + 7} ${y + 18} ${x + 7} ${y + 18}C${x + 7} ${y + 18} ${x} ${y + 14} ${x} ${y + 6}C${x} ${y + 1} ${x + 3} ${y - 2} ${x + 7} ${y - 2}`}
              fill={accent}
              fillOpacity="0.65"
            />
            <text x={x + 18} y={y + 7} fontSize="7.2" fontWeight="800" fill="currentColor">
              {a}
            </text>
            <text x={x + 18} y={y + 16} fontSize="6.1" fontWeight="600" fill="currentColor" opacity="0.62">
              {b}
            </text>
          </g>
        ))}

        <circle cx="116" cy="326" r="16" fill="rgba(255,255,255,0.94)" stroke="rgba(210,188,160,0.55)" />
        <path d="M111 327L119 319M119 319L119 325M119 319H113" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <circle cx="160" cy="220" r="14" fill="white" stroke="currentColor" strokeOpacity="0.18" />
      <circle cx="446" cy="330" r="14" fill="white" stroke="currentColor" strokeOpacity="0.18" />
      <text x="446" y="335" textAnchor="middle" fontSize="14" fontWeight="800" fill="currentColor">
        1
      </text>
    </svg>
  );
}