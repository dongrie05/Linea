import {
  BarberMark,
  ClinicMark,
  RestaurantMark,
} from "@/components/TradeMarks";

const AUDIENCES = [
  {
    name: "Barbearias",
    text: "Um cliente pede um corte. A Linea marca o horário.",
    Mark: BarberMark,
  },
  {
    name: "Clínicas",
    text: "Alguém pede uma consulta. A Linea regista o pedido de marcação.",
    Mark: ClinicMark,
  },
  {
    name: "Restaurantes",
    text: "Um cliente pede uma mesa. A Linea anota a reserva.",
    Mark: RestaurantMark,
  },
];

export default function Audiences() {
  return (
    <section id="para-quem" className="section-anchor">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-measure">
          <h2 className="section-title">
            Para quem <span className="tone-warm">é</span>
          </h2>
          <p className="lede mt-4">
            Pequenos negócios em que uma chamada perdida é uma marcação que não
            acontece. Um caso de cada.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {AUDIENCES.map(item => (
            <li
              key={item.name}
              className="paper rounded-2xl border border-line p-6"
            >
              <item.Mark className="h-16 w-28 text-ink" />
              <h3 className="mt-6 text-[1.5rem] font-semibold tracking-[-0.02em]">
                {item.name}
              </h3>
              <p className="mt-2 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
