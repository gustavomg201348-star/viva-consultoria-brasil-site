(function () {
  const config = window.SITE_CONFIG;
  const page = document.body.dataset.page || "inicio";

  const navItems = [
    ["inicio", "Início", "index.html"],
    ["sobre", "Sobre", "sobre.html"],
    ["servicos", "Serviços", "servicos.html"],
    ["contato", "Contato", "contato.html"]
  ];

  const pathPrefix = document.body.dataset.depth === "1" ? "../" : "";
  const url = (path) => `${pathPrefix}${path}`;

  document.querySelectorAll("[data-company-name]").forEach((el) => {
    el.textContent = config.companyName;
  });

  const header = document.querySelector("[data-site-header]");
  if (header) {
    header.innerHTML = `
      <div class="topline">
        <div class="container topline-inner">
          <span><i data-lucide="map-pin"></i> Caratinga, Minas Gerais</span>
          <a href="tel:${config.phoneHref}"><i data-lucide="phone"></i> ${config.phoneDisplay}</a>
        </div>
      </div>
      <nav class="site-nav" aria-label="Navegacao principal">
        <div class="container nav-inner">
          <a class="brand" href="${url("index.html")}" aria-label="${config.companyName} - início">
            <span class="brand-mark" aria-hidden="true">VC</span>
            <span><strong>${config.companyName}</strong><small>Atendimento e orientação financeira</small></span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-menu" aria-label="Abrir menu">
            <i data-lucide="menu"></i>
          </button>
          <div class="main-menu" id="main-menu">
            ${navItems.map(([id, label, href]) => `<a class="${page === id ? "active" : ""}" href="${url(href)}">${label}</a>`).join("")}
            <a class="button button-sm" href="${url("contato.html")}">Fale conosco</a>
          </div>
        </div>
      </nav>`;
  }

  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `
      <div class="footer-main">
        <div class="container footer-grid">
          <div>
            <a class="brand brand-footer" href="${url("index.html")}">
              <span class="brand-mark" aria-hidden="true">VC</span>
              <span><strong>${config.companyName}</strong><small>Atendimento com clareza e responsabilidade</small></span>
            </a>
            <p class="footer-summary">Promoção de vendas, atendimento e intermediação comercial em soluções financeiras.</p>
          </div>
          <div>
            <h2>Institucional</h2>
            <a href="${url("sobre.html")}">Sobre a empresa</a>
            <a href="${url("servicos.html")}">Serviços</a>
            <a href="${url("contato.html")}">Contato</a>
          </div>
          <div>
            <h2>Informações legais</h2>
            <a href="${url("politica-de-privacidade/index.html")}">Política de Privacidade</a>
            <a href="${url("termos-de-uso/index.html")}">Termos de Uso</a>
            <a href="${url("exclusao-de-dados/index.html")}">Exclusão de Dados</a>
          </div>
          <div>
            <h2>Contato</h2>
            <a href="tel:${config.phoneHref}"><i data-lucide="phone"></i>${config.phoneDisplay}</a>
            <a href="mailto:${config.email}"><i data-lucide="mail"></i>${config.email}</a>
            <span><i data-lucide="map-pin"></i>${config.address}</span>
          </div>
        </div>
      </div>
      <div class="footer-legal">
        <div class="container">
          <p><strong>${config.legalName}</strong> | CNPJ ${config.cnpj}</p>
          <p>&copy; <span data-year></span> ${config.companyName}. Todos os direitos reservados.</p>
        </div>
      </div>`;
  }

  const services = document.querySelector("[data-services]");
  if (services) {
    services.innerHTML = config.services.map((service, index) => `
      <article class="service-card">
        <span class="service-number">0${index + 1}</span>
        <div class="icon-box"><i data-lucide="${service.icon}"></i></div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </article>`).join("");
  }

  document.querySelectorAll("[data-phone]").forEach((el) => el.textContent = config.phoneDisplay);
  document.querySelectorAll("[data-email]").forEach((el) => el.textContent = config.email);
  document.querySelectorAll("[data-address]").forEach((el) => el.textContent = config.address);
  document.querySelectorAll("[data-legal-name]").forEach((el) => el.textContent = config.legalName);
  document.querySelectorAll("[data-cnpj]").forEach((el) => el.textContent = config.cnpj);
  document.querySelectorAll("[data-year]").forEach((el) => el.textContent = new Date().getFullYear());
  document.querySelectorAll("[data-phone-link]").forEach((el) => el.href = `tel:${config.phoneHref}`);
  document.querySelectorAll("[data-email-link]").forEach((el) => el.href = `mailto:${config.email}`);

  const whatsapp = document.querySelector("[data-whatsapp]");
  if (whatsapp) {
    if (config.whatsappHref) {
      whatsapp.href = `https://wa.me/${config.whatsappHref}`;
      whatsapp.querySelector("span").textContent = config.whatsappDisplay;
    } else {
      whatsapp.classList.add("is-disabled");
      whatsapp.removeAttribute("href");
      whatsapp.querySelector("span").textContent = "WhatsApp: número a confirmar";
    }
  }

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      toggle.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`;
      if (window.lucide) window.lucide.createIcons();
    });
  }

  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
})();
