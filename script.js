const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll("[data-nav] a[href^='#']")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setMenu = (isOpen) => {
  if (!menuToggle || !nav || !header) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  nav.classList.toggle("is-open", isOpen);
  header.classList.toggle("menu-active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
};

menuToggle?.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) setMenu(false);
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 36);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = [...document.querySelectorAll("[data-reveal]")];

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -45px" },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min((index % 4) * 55, 165)}ms`;
    revealObserver.observe(item);
  });
}

const observedSections = ["historia", "trayectoria", "cursos", "prensa", "contacto"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { threshold: [0.18, 0.35, 0.55], rootMargin: "-18% 0px -58%" },
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

const courseCatalog = {
  defensa: {
    title: "La defensa como identidad",
    description:
      "Una propuesta para pasar de las ideas defensivas aisladas a un sistema compartido por todo el equipo.",
    format: "Online o presencial",
    audience: "Entrenadores/as",
    topics: [
      "Principios antes que jugadas",
      "Comunicación y responsabilidades",
      "Diseño de tareas con transferencia al juego",
      "Observación, corrección y seguimiento",
    ],
  },
  liderazgo: {
    title: "Liderar equipos que aprenden",
    description:
      "Herramientas para organizar personas, conversaciones y objetivos dentro de un proceso competitivo.",
    format: "Online o presencial",
    audience: "Staffs y dirigentes",
    topics: [
      "Construcción de cultura",
      "Roles claros y liderazgo compartido",
      "Feedback que mejora el rendimiento",
      "Gestión del conflicto y la presión",
    ],
  },
  formacion: {
    title: "Formar con propósito",
    description:
      "Criterios para acompañar el desarrollo técnico y personal de jugadores y jugadoras en edades formativas.",
    format: "Campus o clínica",
    audience: "Formadores/as",
    topics: [
      "El juego como herramienta pedagógica",
      "Progresiones por etapa",
      "Hábitos, autonomía y toma de decisiones",
      "Cómo evaluar un proceso formativo",
    ],
  },
};

const courseDialog = document.querySelector("[data-course-dialog]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogDescription = document.querySelector("[data-dialog-description]");
const dialogFormat = document.querySelector("[data-dialog-format]");
const dialogAudience = document.querySelector("[data-dialog-audience]");
const dialogTopics = document.querySelector("[data-dialog-topics]");

const syncDialogState = () => {
  const anyOpen = [...document.querySelectorAll("dialog")].some((dialog) => dialog.open);
  document.body.classList.toggle("dialog-open", anyOpen);
};

document.querySelectorAll("[data-course]").forEach((button) => {
  button.addEventListener("click", () => {
    const course = courseCatalog[button.dataset.course];
    if (!course || !courseDialog) return;

    dialogTitle.textContent = course.title;
    dialogDescription.textContent = course.description;
    dialogFormat.textContent = course.format;
    dialogAudience.textContent = course.audience;
    dialogTopics.replaceChildren(
      ...course.topics.map((topic) => {
        const item = document.createElement("li");
        item.textContent = topic;
        return item;
      }),
    );

    courseDialog.showModal();
    syncDialogState();
  });
});

document.querySelector("[data-dialog-close]")?.addEventListener("click", () => {
  courseDialog?.close();
});

document.querySelector("[data-dialog-contact]")?.addEventListener("click", () => {
  courseDialog?.close();
});

const creditsDialog = document.querySelector("[data-credits-dialog]");

document.querySelector("[data-credits-open]")?.addEventListener("click", () => {
  creditsDialog?.showModal();
  syncDialogState();
});

document.querySelector("[data-credits-close]")?.addEventListener("click", () => {
  creditsDialog?.close();
});

[courseDialog, creditsDialog].forEach((dialog) => {
  if (!dialog) return;

  dialog.addEventListener("close", syncDialogState);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const contactEmail = document.documentElement.dataset.contactEmail?.trim();

  if (contactEmail) {
    const subject = encodeURIComponent(`Consulta web: ${formData.get("interest")}`);
    const body = encodeURIComponent(
      `Nombre: ${formData.get("name")}\nCorreo: ${formData.get("email")}\nInterés: ${formData.get("interest")}\n\n${formData.get("message")}`,
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    return;
  }

  formStatus.textContent =
    "¡Gracias! Esta maqueta está lista; falta conectar el correo oficial para recibir consultas.";
  formStatus.classList.add("is-success");
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
