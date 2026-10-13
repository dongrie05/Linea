const AUDIENCES = [
  {
    name: "Barbearias",
    text: "Um cliente pede um corte. A Linea marca o horário.",
  },
  {
    name: "Clínicas",
    text: "Alguém pede uma consulta. A Linea regista o pedido de marcação.",
  },
  {
    name: "Restaurantes",
    text: "Um cliente pede uma mesa. A Linea anota a reserva.",
  },
];

export default function Audiences() {
  return (
    <section
      id="para-quem"
      className="section-anchor border-y border-line bg-elevated"
    >
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-measure">
          <h2 className="section-title">Para quem é</h2>
          <p className="lede mt-4">
            Pequenos negócios em que uma chamada perdida é uma marcação que não
            acontece. Um caso de cada.
          </p>
        </div>
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {AUDIENCES.map(item => (
            <li key={item.name}>
              <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em]">
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
