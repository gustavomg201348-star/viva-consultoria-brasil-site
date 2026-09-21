# Viva Consultoria - site institucional

Site estático independente, preparado para hospedagem gratuita no Cloudflare Pages.

## Edição dos dados

Os dados reutilizáveis ficam centralizados em `assets/site-config.js`:

- nome da empresa;
- razão social e CNPJ;
- telefone e WhatsApp;
- e-mail e endereço;
- domínio;
- serviços.

Antes da publicação, confirme o número oficial de WhatsApp e substitua os campos marcados com colchetes.

## Teste local

Na pasta do projeto, execute:

```powershell
python -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Cloudflare Pages

O projeto não exige build.

- Framework preset: `None`
- Build command: deixar vazio
- Build output directory: `.`
- Root directory: `/`

Os arquivos `_headers` e `_redirects` serão reconhecidos pelo Cloudflare Pages.
