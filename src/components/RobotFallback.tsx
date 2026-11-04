export function RobotFallback() {
  return (
    <svg className="robot-fallback" viewBox="0 0 400 500" aria-hidden="true">
      <defs>
        <linearGradient id="robot-pearl" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#fff" />
          <stop offset=".58" stopColor="#dedfd7" />
          <stop offset="1" stopColor="#aeb1a7" />
        </linearGradient>
        <linearGradient id="robot-metal" x1="0" x2="1">
          <stop stopColor="#858a80" />
          <stop offset=".5" stopColor="#d0d2ca" />
          <stop offset="1" stopColor="#777c72" />
        </linearGradient>
      </defs>
      <ellipse cx="204" cy="448" rx="91" ry="12" fill="#111" opacity=".09" />
      <g transform="rotate(-3 200 250)">
        <g fill="url(#robot-pearl)" stroke="#aeb1a7" strokeWidth="1.5">
          <rect x="143" y="70" width="114" height="96" rx="25" />
        </g>
        <rect x="152" y="94" width="98" height="43" rx="15" fill="#252a27" />
        <path d="M165 105h72" stroke="#747b70" strokeWidth="2" />
        <circle cx="142" cy="118" r="13" fill="url(#robot-metal)" stroke="#777c72" />
        <circle cx="258" cy="118" r="13" fill="url(#robot-metal)" stroke="#777c72" />

        <rect x="181" y="163" width="38" height="33" rx="13" fill="#373c35" />
        <rect
          x="148"
          y="190"
          width="104"
          height="105"
          rx="25"
          fill="url(#robot-pearl)"
          stroke="#aeb1a7"
          strokeWidth="1.5"
        />
        <path d="M166 204h68" stroke="#fff" strokeWidth="3" opacity=".55" />
        <rect x="171" y="285" width="58" height="20" rx="8" fill="#454b40" />
        <circle cx="200" cy="252" r="8" fill="#444b41" stroke="#74796e" />

        <g fill="url(#robot-pearl)" stroke="#aeb1a7" strokeWidth="1.5">
          <rect x="99" y="216" width="29" height="51" rx="14" transform="rotate(12 113 241)" />
          <rect x="272" y="216" width="29" height="51" rx="14" transform="rotate(-12 286 241)" />
          <rect x="88" y="278" width="27" height="48" rx="13" transform="rotate(8 101 302)" />
          <rect x="285" y="278" width="27" height="48" rx="13" transform="rotate(-8 298 302)" />
          <rect x="84" y="327" width="31" height="30" rx="10" />
          <rect x="285" y="327" width="31" height="30" rx="10" />
        </g>
        <g fill="#41463e">
          <circle cx="137" cy="221" r="15" />
          <circle cx="263" cy="221" r="15" />
          <circle cx="103" cy="272" r="12" />
          <circle cx="297" cy="272" r="12" />
          <circle cx="99" cy="325" r="8" />
          <circle cx="301" cy="325" r="8" />
          <circle cx="173" cy="314" r="14" />
          <circle cx="227" cy="314" r="14" />
          <circle cx="174" cy="370" r="12" />
          <circle cx="226" cy="370" r="12" />
        </g>
        <g fill="url(#robot-pearl)" stroke="#aeb1a7" strokeWidth="1.5">
          <rect x="155" y="321" width="37" height="51" rx="15" />
          <rect x="208" y="321" width="37" height="51" rx="15" />
          <rect x="158" y="379" width="33" height="44" rx="13" />
          <rect x="209" y="379" width="33" height="44" rx="13" />
          <rect x="148" y="416" width="51" height="25" rx="9" />
          <rect x="201" y="416" width="51" height="25" rx="9" />
        </g>
        <path d="M150 437h47m7 0h47" stroke="#555a50" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
