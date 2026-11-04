export function Icon({
  name = "arrow",
  size = 20,
}: {
  name?: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (name === "download")
    return (
      <svg {...common}>
        <path d="M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5" />
      </svg>
    );
  if (name === "github")
    return (
      <svg {...common}>
        <path d="M9 19c-4 1.2-4-2-6-2m12 5v-3.4c0-1 .1-1.8-.5-2.4 3.3-.4 6.5-1.6 6.5-7a5.4 5.4 0 0 0-1.5-3.7 5 5 0 0 0-.1-3.6s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C5.3 1.5 4.1 1.9 4.1 1.9A5 5 0 0 0 4 5.5 5.4 5.4 0 0 0 2.5 9.2c0 5.4 3.2 6.6 6.5 7-.6.6-.6 1.4-.5 2.4V22" />
      </svg>
    );
  if (name === "linkedin")
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4" />
      </svg>
    );
  if (name === "x")
    return (
      <svg {...common}>
        <path d="M4 3h4l12 18h-4L4 3Zm0 18L20 3" />
      </svg>
    );
  if (name === "mail")
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </svg>
    );
  if (name === "close")
    return (
      <svg {...common}>
        <path d="m6 6 12 12M6 18 18 6" />
      </svg>
    );
  if (name === "down")
    return (
      <svg {...common}>
        <path d="M12 3v18m-6-6 6 6 6-6" />
      </svg>
    );
  if (name === "plus")
    return (
      <svg {...common}>
        <path d="M12 4v16M4 12h16" />
      </svg>
    );
  if (name === "check")
    return (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  if (name === "copy")
    return (
      <svg {...common}>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V4H4v12h4" />
      </svg>
    );
  if (name === "left")
    return (
      <svg {...common}>
        <path d="M20 12H4m6-6-6 6 6 6" />
      </svg>
    );
  if (name === "right")
    return (
      <svg {...common}>
        <path d="M4 12h16m-6-6 6 6-6 6" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}
