/**
 * Marcador visível para um dado que a especificação deixa em aberto.
 * Não é uma cor de estado: o texto usa o azul de leitura sobre o cartão.
 */
export default function Pending({ children }: { children: React.ReactNode }) {
  return (
    <div className="pending" role="note">
      <strong>Por decidir</strong>
      <span>{children}</span>
    </div>
  );
}
