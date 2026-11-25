# Linea - Website

Site moderno e responsivo para a startup Linea (SaaS / Atendedor de chamadas com Inteligência Artificial).

## 🚀 Características

- **Design Moderno**: Inspirado em Stripe, Linear e Notion
- **Totalmente Responsivo**: Mobile-first design
- **Animações Suaves**: Fade-in, parallax leve, microinterações
- **Multilíngue**: Suporte para Português, Inglês, Espanhol, Francês e Alemão
- **Otimizado para SEO**: Meta tags e estrutura clean
- **Vercel**: Site e API de demonstração no mesmo domínio

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **next-intl** - Internacionalização
- **Lucide React** - Ícones

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/linea-website.git
cd linea-website
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🌍 Idiomas Suportados

- 🇵🇹 Português (padrão)
- 🇬🇧 English
- 🇪🇸 Español
- 🇫🇷 Français
- 🇩🇪 Deutsch

## Publicação e demonstração

O site e a API correm na Vercel em `linea.dongrielabs.com`. O GitHub Pages publica apenas o redirecionamento para esse domínio.

1. Configure `DEMO_DATABASE_URL` com a ligação a PostgreSQL e aplique `scripts/demo/schema.sql` com `node --env-file=.env.local scripts/demo/setup.mjs` (Node.js 20.6 ou mais recente). Para este comando, guarde a ligação em `.env.local`, que está ignorado pelo Git.
2. Nas variáveis do projeto na Vercel, configure `DEMO_DATABASE_URL`, `VAPI_PRIVATE_API_KEY`, `VAPI_DEMO_ASSISTANT_ID` e `DEMO_ADMIN_TOKEN`. Confirme no painel Vapi que o ID é o da clínica fictícia e que está publicada a versão prevista para a demo, com duração máxima de 180 segundos e sem integrações reais. Use um código de gestão aleatório, por exemplo gerado com `openssl rand -hex 32`.
3. Abra `/demo/gestao/`, introduza o código de gestão, escolha uma ou três tentativas e indique o nome da clínica. Gere e partilhe o link com o cliente. Use **Ver convites ativos** para encontrar a clínica e desativar o convite.
4. Confirme numa chamada de teste que há áudio nos dois sentidos, que a chamada termina aos três minutos e que o contador baixa. Teste com dois separadores e confirme o bloqueio da segunda tentativa num convite de uma tentativa e da quarta num convite de três tentativas.

Se usar Supabase, aplique o SQL no **SQL Editor** do projeto da Linea. Em **Connect → Transaction pooler**, copie a URI PostgreSQL da porta `6543` para `DEMO_DATABASE_URL` na Vercel. A ligação deve usar o utilizador indicado na URI do projeto e SSL. A tabela tem RLS ativo e fica reservada ao acesso do servidor.

Cada convite vale sete dias e permite uma chamada de cada vez no navegador. A gestão cria os convites que a equipa envia diretamente aos clientes. Em caso de resposta incerta da Vapi ao criar uma chamada, o convite fica bloqueado para evitar uma segunda chamada. Consulte os registos da Vapi antes de desativar e substituir o convite.

## 📁 Estrutura do Projeto

```
├── app/
│   ├── [locale]/          # Páginas com suporte multilíngue
│   ├── globals.css        # Estilos globais
│   └── layout.tsx         # Layout raiz
├── components/            # Componentes React
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── ProblemSolution.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   └── FinalCTA.tsx
├── messages/              # Traduções
│   ├── pt.json
│   ├── en.json
│   ├── es.json
│   ├── fr.json
│   └── de.json
├── public/                # Arquivos estáticos
└── styles/                # Estilos adicionais
```

## 🎨 Personalização

### Cores

As cores podem ser personalizadas no arquivo `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Azul-escuro para confiança
  },
  secondary: {
    // Verde para poupança
  },
  accent: {
    // Roxo tech para IA
  }
}
```

### Conteúdo

O conteúdo pode ser editado nos arquivos JSON em `messages/` para cada idioma.

### Animações

As animações podem ser personalizadas no arquivo `globals.css` e nos componentes individuais.

## 📱 Responsividade

O site foi desenvolvido com abordagem mobile-first e inclui breakpoints para:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linter

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato através de:

- Email: hello@linea.pt
- Website: [linea.pt](https://linea.pt)

---

Desenvolvido com ❤️ para a Linea
