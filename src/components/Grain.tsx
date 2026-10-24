import { GRAIN } from "@/lib/grain";

export default function Grain() {
  return (
    <div
      className="grain"
      style={{ backgroundImage: `url(${GRAIN})` }}
      aria-hidden="true"
    />
  );
}
