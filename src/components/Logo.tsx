import { publicPath } from "@/lib/site";

type LogoProps = {
  /** Altura em píxeis. Mínimo de ecrã do lockup: 20. */
  height?: number;
  className?: string;
};

/**
 * Lockup escuro aprovado. O SVG é servido como está, sem recolorir nem esticar.
 * A proporção vem do viewBox 160.24 × 44.
 */
export default function Logo({ height = 28, className = "" }: LogoProps) {
  return (
    <img
      src={publicPath("/brand/linea-lockup-dark.svg")}
      alt="Linea"
      width={160}
      height={44}
      className={className}
      style={{
        height,
        width: "auto",
        aspectRatio: "160.24 / 44",
      }}
    />
  );
}
