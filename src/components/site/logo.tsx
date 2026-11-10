export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill="#2F7DEB" />
      <path
        d="M6.5 16.2c1.6 0 2.2-6.4 4.6-6.4 2.5 0 2.8 12.6 5.4 12.6 2.6 0 2.9-12.6 5.4-12.6 2.2 0 2.8 6.4 4.2 6.4"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3.2 2.8h2.2l1 2.4-1.3 1a8.2 8.2 0 0 0 4.7 4.7l1-1.3 2.4 1v2.2c0 .5-.4 1-1 1A11 11 0 0 1 2.2 3.8c0-.6.5-1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
