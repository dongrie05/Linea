type MarkProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BarberMark({ className = "h-20 w-32" }: MarkProps) {
  return (
    <svg viewBox="0 0 128 80" className={className} aria-hidden="true">
      <path d="M24 16v48" {...stroke} />
      <path
        d="M24 20h12M24 28h12M24 36h12M24 44h12M24 52h12M24 60h10"
        {...stroke}
      />
      <circle cx="58" cy="26" r="9" {...stroke} />
      <circle cx="86" cy="54" r="9" {...stroke} />
      <path d="M64 32l28 28M70 40L46 64" {...stroke} />
      <circle cx="67" cy="37" r="3.2" className="fill-cyan" />
    </svg>
  );
}

export function ClinicMark({ className = "h-20 w-32" }: MarkProps) {
  return (
    <svg viewBox="0 0 128 80" className={className} aria-hidden="true">
      <path d="M16 58h96" {...stroke} />
      <path d="M28 58V46h72v12" {...stroke} />
      <path d="M46 46v-8c0-8 6-14 14-14s14 6 14 14v8" {...stroke} />
      <circle cx="60" cy="22" r="2.4" className="fill-cyan" />
      <rect x="86" y="18" width="22" height="30" rx="2" {...stroke} />
      <path d="M92 28h10M92 34h8" {...stroke} />
    </svg>
  );
}

export function RestaurantMark({ className = "h-20 w-32" }: MarkProps) {
  return (
    <svg viewBox="0 0 128 80" className={className} aria-hidden="true">
      <ellipse cx="58" cy="50" rx="36" ry="12" {...stroke} />
      <circle cx="44" cy="46" r="9" {...stroke} />
      <circle cx="72" cy="46" r="9" {...stroke} />
      <path d="M96 24h12l-2 16a4 4 0 0 1-8 0l-2-16z" {...stroke} />
      <path d="M102 40v14" {...stroke} />
      <circle cx="102" cy="20" r="2.4" className="fill-cyan" />
    </svg>
  );
}

export function ListenBars() {
  const bars = [18, 34, 26, 48, 30, 56, 38, 22, 44, 16, 36, 24];
  return (
    <div className="flex h-16 items-end gap-1.5" aria-hidden="true">
      {bars.map((height, index) => (
        <span
          key={height + index}
          className={index % 3 === 0 ? "bg-cyan" : "bg-blue"}
          style={{ height, width: 6, borderRadius: 999 }}
        />
      ))}
    </div>
  );
}
