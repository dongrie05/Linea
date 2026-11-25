/** Email de contacto (rodapé, mailto público e formulário). */
export const CONTACT_EMAIL = "linea.atendedor@gmail.com";
export const LEADS_EMAIL = "linea.atendedor@gmail.com";

/**
 * Chave do Web3Forms (pública por natureza), definida na Vercel como
 * NEXT_PUBLIC_WEB3FORMS_KEY. Sem chave, o formulário abre o email (mailto).
 */
export const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim() ?? "";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const CONTACT_PHONE_DISPLAY = "+351 927 699 882";
export const CONTACT_PHONE_E164 = "+351927699882";
export const CONTACT_PHONE_WHATSAPP = "351927699882";

export const CONTACT_PHONES = [
  { display: "+351 927 699 882", e164: "+351927699882" },
  { display: "+351 964 000 234", e164: "+351964000234" },
] as const;
