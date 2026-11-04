export function ProjectArt({ kind }: { kind: string }) {
  if (kind === "catalyst")
    return (
      <div className="site-mockup">
        <div className="browser-bar">
          <span />
          <span />
          <span />
          <small>clickcatalyst.uk</small>
        </div>
        <img
          src="/click-catalyst.webp"
          width="1348"
          height="927"
          alt="Click Catalyst’s current live homepage"
          loading="lazy"
        />
      </div>
    );
  if (kind === "tip")
    return (
      <div className="art tip-art" aria-hidden="true">
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="receipt">
          <div className="receipt-top">
            <span>THE FAIR SPLIT</span>
            <span>↗</span>
          </div>
          <div className="receipt-dots" />
          <div className="receipt-row">
            <span>Bill total</span>
            <b>$100.00</b>
          </div>
          <div className="receipt-row">
            <span>Tip</span>
            <b>12%</b>
          </div>
          <div className="receipt-row">
            <span>People</span>
            <b>04</b>
          </div>
          <div className="receipt-total">
            <small>PER PERSON</small>
            <strong>
              $28<span>.00</span>
            </strong>
          </div>
          <div className="barcode" />
          <div className="receipt-footer">GOOD CODE. FAIR SHARE.</div>
        </div>
        <span className="art-caption">PYTHON / ARITHMETIC</span>
      </div>
    );
  if (kind === "pizza")
    return (
      <div className="art pizza-art" aria-hidden="true">
        <svg className="pizza-drawing" viewBox="0 0 400 300">
          <defs>
            <linearGradient id="slice" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#e4e3dd" />
              <stop offset="1" stopColor="#aaa99e" />
            </linearGradient>
            <filter id="pizza-shadow">
              <feDropShadow
                dx="0"
                dy="16"
                stdDeviation="8"
                floodOpacity=".12"
              />
            </filter>
          </defs>
          <g
            transform="translate(180 155) rotate(-15)"
            filter="url(#pizza-shadow)"
          >
            <ellipse rx="117" ry="81" fill="#cfcec5" />
            <ellipse
              cy="-9"
              rx="117"
              ry="81"
              fill="url(#slice)"
              stroke="#8a897e"
            />
            <ellipse
              cy="-10"
              rx="102"
              ry="67"
              fill="#eae9df"
              stroke="#b2b1a7"
            />
            {Array.from({ length: 6 }, (_, i) => (
              <path
                key={i}
                d="M0-10 100-10"
                transform={"rotate(" + i * 60 + " 0 -10)"}
                stroke="#aaa99e"
              />
            ))}
            <circle cx="-48" cy="-30" r="11" fill="#c4b1a5" />
            <circle cx="42" cy="-35" r="11" fill="#c4b1a5" />
            <circle cx="-10" cy="32" r="11" fill="#c4b1a5" />
            <circle cx="-62" cy="10" r="10" fill="#c4b1a5" />
            <circle cx="48" cy="15" r="10" fill="#c4b1a5" />
          </g>
        </svg>
        <div className="order-label">
          <span>ORDER_003</span>
          <b>M + P + C</b>
          <small>
            FINAL BILL <strong>$24</strong>
          </small>
        </div>
        <span className="art-caption">PYTHON / CONDITIONAL LOGIC</span>
      </div>
    );
  return (
    <div className="art coaster-art" aria-hidden="true">
      <div className="ticket">
        <div className="ticket-side">ONE WAY TO THE TOP</div>
        <div className="ticket-main">
          <small>ROLLERCOASTER / ADMIT ONE</small>
          <strong>
            120<span>cm</span>
          </strong>
          <div className="ticket-rule" />
          <div className="ticket-bottom">
            <span>MINIMUM HEIGHT</span>
            <span>↗</span>
          </div>
        </div>
      </div>
      <svg className="coaster-line" viewBox="0 0 600 300">
        <path
          d="M-10 230C90 230 80 60 180 60S300 300 390 190 450 80 620 120"
          fill="none"
          stroke="#babbb2"
          strokeWidth="2"
        />
        <path
          d="M-10 238C90 238 80 68 180 68S300 308 390 198 450 88 620 128"
          fill="none"
          stroke="#babbb2"
          strokeWidth="1"
        />
      </svg>
      <span className="art-caption">PYTHON / DECISION MAKING</span>
    </div>
  );
}
