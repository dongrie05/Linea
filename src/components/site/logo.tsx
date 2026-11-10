import { asset } from "@/lib/asset";

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="logo-mark"
      src={asset("/brand/logo.png")}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
    />
  );
}

export function Orb({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <span className={`orb orb--${size}`} aria-hidden="true">
      <span className="orb__glow" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="orb__img" src={asset("/brand/orb.png")} alt="" />
    </span>
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

export function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="m3.5 8.5 3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg
      className="arrow"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
