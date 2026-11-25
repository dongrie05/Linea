"use client";

import { useState, type FormEvent } from "react";
import { asset } from "@/lib/asset";

type Invite = { url: string; id: string; expiresAt: string; callLimit: number };

export function InviteManager() {
  const [secret, setSecret] = useState("");
  const [inviteId, setInviteId] = useState("");
  const [callLimit, setCallLimit] = useState(1);
  const [invite, setInvite] = useState<Invite>();
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");

  async function manage(
    event: FormEvent<HTMLFormElement>,
    action: "create" | "revoke"
  ) {
    event.preventDefault();
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
        body: JSON.stringify(
          action === "create"
            ? { action, callLimit }
            : { action, id: inviteId.trim() }
        ),
      });
      const result = await response.json();
      if (!response.ok) {
        setStatus(result.error);
      } else if (action === "create") {
        const url = new URL(asset("/demo/"), window.location.origin);
        url.hash = result.token;
        setInvite({
          url: url.href,
          id: result.id,
          expiresAt: result.expiresAt,
          callLimit: result.callLimit,
        });
        setInviteId(result.id);
        setStatus(
          "Convite criado. Copie o link para o partilhar e guarde o ID para o desativar se precisar."
        );
      } else {
        if (invite?.id === inviteId.trim()) setInvite(undefined);
        setInviteId("");
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
      <form onSubmit={event => void manage(event, "create")}>
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
        <button
          type="submit"
          className="btn btn--primary"
          disabled={pending || !secret.trim()}
        >
          Gerar convite
        </button>
      </form>
      {invite && (
        <div>
          <div className="field">
            <label htmlFor="demo-link">Link do cliente</label>
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
            {new Intl.DateTimeFormat("pt-PT", {
              dateStyle: "long",
              timeStyle: "short",
              timeZone: "Europe/Lisbon",
            }).format(new Date(invite.expiresAt))}
            .
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
      <form onSubmit={event => void manage(event, "revoke")}>
        <div className="field">
          <label htmlFor="demo-invite-id">ID de gestão do convite</label>
          <input
            id="demo-invite-id"
            value={inviteId}
            onChange={event => setInviteId(event.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn--ghost"
          disabled={pending || !secret.trim() || !inviteId.trim()}
        >
          Desativar convite
        </button>
      </form>
      <p role="status">{status}</p>
    </>
  );
}
