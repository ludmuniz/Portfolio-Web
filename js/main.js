// Efeito de digitação nos papéis
const roles = [
  "pipelines de dados no Azure",
  "RAG e agentes de IA",
  "Databricks e PySpark",
  "qualidade de dados",
];
const target = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function type() {
  let i = 0;
  while (true) {
    for (const char of roles[i]) {
      target.textContent += char;
      await sleep(60);
    }
    await sleep(1600);
    while (target.textContent.length) {
      target.textContent = target.textContent.slice(0, -1);
      await sleep(30);
    }
    await sleep(300);
    i = (i + 1) % roles.length;
  }
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

if (reduceMotion) target.textContent = roles[0];
else type();

// Revelar elementos ao rolar
const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Ano do rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Contadores animados (ex.: 3+)
const counters = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  const el = entry.target;
  const end = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const start = performance.now();
  const tick = (now) => {
    const progress = reduceMotion ? 1 : Math.min((now - start) / 1200, 1);
    el.textContent = Math.round(end * progress) + (progress === 1 ? suffix : "");
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  counters.unobserve(el);
}));
document.querySelectorAll("[data-count]").forEach((el) => counters.observe(el));