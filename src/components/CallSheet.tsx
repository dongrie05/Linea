"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Pending from "@/components/Pending";

export default function CallSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "held">("idle");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      titleRef.current?.focus();
      return;
    }
    if (dialog.open) dialog.close();
  }, [open]);

  const finish = () => {
    setConsent(false);
    setStatus("idle");
    if (phoneRef.current) phoneRef.current.value = "";
    onClose();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phoneRef.current) phoneRef.current.value = "";
    setConsent(false);
    setStatus("held");
  };

  return (
    <dialog
      ref={dialogRef}
      className="call-sheet"
      aria-labelledby={titleId}
      onClose={finish}
      onClick={event => {
        if (event.target === dialogRef.current) finish();
      }}
    >
      <form
        onSubmit={onSubmit}
        className="flex max-h-[inherit] flex-col gap-4 overflow-y-auto px-5 py-6 sm:px-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            ref={titleRef}
            tabIndex={-1}
            className="title-sm outline-none"
          >
            A Linea liga-lhe
          </h2>
          <button
            type="button"
            className="btn btn-secondary px-3"
            onClick={finish}
          >
            Fechar
          </button>
        </div>
        <p>
          Escreva o seu número de telemóvel. Recebe um código por SMS, confirma,
          e a Linea liga-lhe em segundos. Só números portugueses.
        </p>
        <Pending>
          Esta demonstração ainda não liga nem envia SMS. O número não é
          guardado.
        </Pending>
        <label className="block">
          <span className="text-[0.95rem] font-semibold">
            O seu número de telemóvel
          </span>
          <span className="mt-2 flex gap-2">
            <span className="prefix shrink-0">+351</span>
            <input
              ref={phoneRef}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="9XX XXX XXX"
              className="field grow"
              aria-label="Número de telemóvel português, sem o indicativo"
            />
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0"
            checked={consent}
            required
            onChange={event => setConsent(event.target.checked)}
          />
          <span>
            Pedi esta chamada e o número é meu. Aceito que a Linea me ligue uma
            vez para esta demonstração e que o número seja usado só para isso,
            como explicado na{" "}
            <Link href="/#politica" className="link" onClick={finish}>
              política de privacidade
            </Link>
            .
          </span>
        </label>
        <button type="submit" className="btn btn-primary">
          Enviar código
        </button>
        {status === "held" ? (
          <p role="status">
            Não foi enviado nenhum código. A chamada de demonstração ainda não
            está ligada e o número foi limpo deste ecrã.
          </p>
        ) : null}
        <Pending>
          Tentativas do código (a especificação sugere 2) e janela em que um
          número não pode repetir a demonstração (hoje ou nos últimos 30 dias).
        </Pending>
        <p className="caption">
          Uma chamada por número. Sem marketing depois. O número é apagado
          depois da chamada, num prazo ainda por decidir.
        </p>
        <Pending>
          Prazo para apagar o número. A especificação sugere 24 horas.
        </Pending>
      </form>
    </dialog>
  );
}
