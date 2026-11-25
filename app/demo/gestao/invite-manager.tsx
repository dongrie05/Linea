"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import type { DemoInviteSummary } from "@/lib/demo";

type Invite = DemoInviteSummary & { url: string };
type Operation =
  | { action: "create"; callLimit: number; clinicName: string }
  | { action: "revoke"; id: string }
  | { action: "list" };

const expiryFormat = new Intl.DateTimeFormat("pt-PT", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Europe/Lisbon",
});

export function InviteManager() {
  const [secret, setSecret] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [callLimit, setCallLimit] = useState(1);
  const [invite, setInvite] = useState<Invite>();
  const [activeInvites, setActiveInvites] = useState<DemoInviteSummary[]>();
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");

  async function manage(operation: Operation) {
    if (!secret.trim() || pending) return;
    setPending(true);
    setStatus("");
    try {
      const response = await fetch(asset("/api/demo/admin/"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secret.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      });
      const result = await response.json();
      if (!response.ok) {
        setStatus(result.error);
      } else if (operation.action === "create") {
        const url = new URL(asset("/demo/"), window.location.origin);
        url.hash = result.token;
        const summary: DemoInviteSummary = {
          id: result.id,
          clinicName: result.clinicName,
          expiresAt: result.expiresAt,
          callLimit: result.callLimit,
          remaining: result.remaining,
        };
        setInvite({ ...summary, url: url.href });
        setActiveInvites(current => current && [summary, ...current]);
        setStatus("Convite criado. Copie o link para o partilhar.");
      } else if (operation.action === "list") {
        setActiveInvites(result.invites);
      } else {
        setInvite(current =>
          current?.id === operation.id ? undefined : current
        );
        setActiveInvites(current =>
          current?.filter(item => item.id !== operation.id)
        );
        setStatus("Convite desativado.");
      }
    } catch {
      setStatus("Não foi possível concluir o pedido. Verifique a ligação.");
    } finally {
      setPending(false);
    }
  }

  async function copyInvite(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copiado.");
    } catch {
      setStatus("Selecione o endereço para o copiar.");
    }
  }

  return (
    <>
      <div className="field">
        <label htmlFor="demo-secret">Código de gestão</label>
        <input
          id="demo-secret"
          type="password"
          value={secret}
          autoComplete="off"
          onChange={event => setSecret(event.target.value)}
        />
      </div>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (clinicName.trim())
            void manage({ action: "create", clinicName, callLimit });
        }}
      >
        <div className="field">
          <label htmlFor="demo-call-limit">Tentativas por convite</label>
          <select
            id="demo-call-limit"
            value={callLimit}
            onChange={event => setCallLimit(Number(event.target.value))}
            disabled={pending}
          >
            <option value={1}>Uma tentativa</option>
            <option value={3}>Três tentativas</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="demo-clinic-name">Nome da clínica</label>
          <input
            id="demo-clinic-name"
            value={clinicName}
            onChange={event => setClinicName(event.target.value)}
            maxLength={120}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn--primary"
          disabled={pending || !secret.trim() || !clinicName.trim()}
        >
          Gerar convite
        </button>
      </form>
      {invite && (
        <div>
          <div className="field">
            <label htmlFor="demo-link">Link para {invite.clinicName}</label>
            <input
              id="demo-link"
              readOnly
              value={invite.url}
              onFocus={event => event.currentTarget.select()}
            />
          </div>
          <p>
            {invite.callLimit === 1 ? "Uma tentativa" : "Três tentativas"}, até
            três minutos por chamada. Válido até{" "}
            {expiryFormat.format(new Date(invite.expiresAt))}.
          </p>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => void copyInvite(invite.url)}
          >
            Copiar link
          </button>
        </div>
      )}
      <button
        type="button"
        className="btn btn--ghost"
        disabled={pending || !secret.trim()}
        onClick={() => void manage({ action: "list" })}
      >
        {activeInvites ? "Atualizar convites ativos" : "Ver convites ativos"}
      </button>
      {activeInvites &&
        (activeInvites.length ? (
          <ul className="demo-invites" aria-label="Convites ativos">
            {activeInvites.map(item => (
              <li key={item.id}>
                <p>
                  <strong>
                    {item.clinicName ?? "Convite anterior sem nome"}
                  </strong>
                </p>
                <p>
                  {item.remaining} de {item.callLimit} tentativas · Válido até{" "}
                  {expiryFormat.format(new Date(item.expiresAt))}.
                </p>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  disabled={pending || !secret.trim()}
                  onClick={() => void manage({ action: "revoke", id: item.id })}
                >
                  Desativar convite
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há convites ativos.</p>
        ))}
      <p role="status">{status}</p>
    </>
  );
}
