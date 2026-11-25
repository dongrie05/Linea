# 🚀 Instalação Rápida - Linea Website

## Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

## Instalação em 3 passos

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar em desenvolvimento

```bash
npm run dev
```

### 3. Abrir no navegador

Acesse: http://localhost:3000

## 🎯 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Linting
npm run lint
```

## 🌍 Testar Idiomas

- Português: http://localhost:3000/pt
- English: http://localhost:3000/en
- Español: http://localhost:3000/es
- Français: http://localhost:3000/fr
- Deutsch: http://localhost:3000/de

## 🚀 Deploy

### Vercel

O site usa o runtime do Next.js para a API de demonstração. Consulte a configuração em [Publicação e demonstração](README.md#publicação-e-demonstração). O GitHub Pages publica apenas o redirecionamento.

### Executar a compilação localmente

```bash
npm run build
npm run start
```

## ✅ Verificação

Após a instalação, verifique se:

- [ ] Site carrega em http://localhost:3000
- [ ] Todas as seções estão visíveis
- [ ] Animações funcionam
- [ ] Menu de idiomas funciona
- [ ] Site é responsivo (teste em mobile)

## 🆘 Problemas Comuns

### Erro de dependências

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de build

```bash
npm run lint
# Corrija os erros mostrados
```

### Site não carrega

- Verifique se a porta 3000 está livre
- Tente `npm run dev` novamente

---

**Pronto!** Seu site da Linea está funcionando! 🎉
