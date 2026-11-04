export function RobotFallback() {
  return (
    <svg className="robot-fallback" viewBox="0 0 400 500" aria-hidden="true">
      <defs>
        <linearGradient id="pearl">
          <stop stopColor="#fdfdfb" />
          <stop offset=".65" stopColor="#d5d5cc" />
          <stop offset="1" stopColor="#a9a99f" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="452" rx="107" ry="13" fill="#111" opacity=".06" />
      <g transform="rotate(8 200 240)">
        <rect
          x="141"
          y="302"
          width="48"
          height="126"
          rx="23"
          fill="url(#pearl)"
          stroke="#b3b3a8"
        />
        <rect
          x="211"
          y="302"
          width="48"
          height="126"
          rx="23"
          fill="url(#pearl)"
          stroke="#b3b3a8"
        />
        <rect
          x="123"
          y="182"
          width="154"
          height="158"
          rx="55"
          fill="url(#pearl)"
          stroke="#b3b3a8"
        />
        <rect
          x="87"
          y="203"
          width="39"
          height="146"
          rx="19"
          fill="url(#pearl)"
          transform="rotate(11 107 220)"
        />
        <rect
          x="276"
          y="202"
          width="39"
          height="146"
          rx="19"
          fill="url(#pearl)"
          transform="rotate(-13 296 220)"
        />
        <rect x="180" y="161" width="40" height="38" rx="17" fill="#33332d" />
        <rect
          x="119"
          y="56"
          width="162"
          height="123"
          rx="50"
          fill="url(#pearl)"
          stroke="#b3b3a8"
        />
        <rect x="135" y="90" width="130" height="57" rx="24" fill="#23241f" />
        <path d="M153 104h90" stroke="#6a6b60" strokeWidth="2" />
        <circle cx="200" cy="240" r="7" fill="#43443c" />
      </g>
    </svg>
  );
}
