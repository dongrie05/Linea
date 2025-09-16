# Linea - Website

Site moderno e responsivo para a startup Linea (SaaS / Atendedor de chamadas com Inteligência Artificial).

## 🚀 Características

- **Design Moderno**: Inspirado em Stripe, Linear e Notion
- **Totalmente Responsivo**: Mobile-first design
- **Animações Suaves**: Fade-in, parallax leve, microinterações
- **Multilíngue**: Suporte para Português, Inglês, Espanhol, Francês e Alemão
- **Otimizado para SEO**: Meta tags e estrutura clean
- **GitHub Pages Ready**: Configurado para deploy automático

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

## 🚀 Deploy no GitHub Pages

### Deploy Automático

O projeto está configurado para deploy automático via GitHub Actions. Basta fazer push para a branch `main` e o site será atualizado automaticamente.

### Deploy Manual

1. Configure o repositório para GitHub Pages:
   - Vá em Settings > Pages
   - Selecione "GitHub Actions" como fonte

2. Execute o build e export:

```bash
npm run build
npm run export
```

3. Faça push da pasta `out` para a branch `gh-pages`:

```bash
git subtree push --prefix out origin gh-pages
```

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
- `npm run export` - Exporta para GitHub Pages
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
