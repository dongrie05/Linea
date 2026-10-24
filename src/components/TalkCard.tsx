"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Pending from "@/components/Pending";

export default function TalkCard({ onClose }: { onClose: () => void }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [continued, setContinued] = useState(false);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div className="surface-card mx-auto mt-8 max-w-measure px-5 py-5 text-left sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <h2 ref={titleRef} tabIndex={-1} className="title-sm outline-none">
          Falar com a Linea
        </h2>
        <button
          type="button"
          className="btn btn-secondary px-3"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
      <p className="mt-4">
        O browser vai pedir o microfone. Sem microfone não há conversa. A sua
        voz é processada em tempo real pelos fornecedores de voz da Linea, como
        explicado na{" "}
        <Link href="/#politica" className="link" onClick={onClose}>
          política de privacidade
        </Link>
        .
      </p>
      <Pending>
        Ligar a chamada no browser. Enquanto isso, o site não pede o microfone.
      </Pending>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setContinued(true)}
        >
          Continuar
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
      </div>
      {continued ? (
        <p className="mt-4" role="status">
          A demonstração no browser ainda não está ligada. O microfone não foi
          pedido.
        </p>
      ) : null}
    </div>
  );
}
