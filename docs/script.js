const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const progressBar = document.getElementById("progressBar");
const activeLabel = document.getElementById("activeLabel");

const spyLinks = Array.from(document.querySelectorAll("[data-spy]"));
const sections = spyLinks
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function setActive(id){
  spyLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
  const current = spyLinks.find(a => a.getAttribute("href") === `#${id}`);
  if (current && activeLabel) activeLabel.textContent = current.textContent.replace(/^\d+\s+/, "");
}

const spy = new IntersectionObserver((entries) => {
  const topMost = entries
    .filter(e => e.isIntersecting)
    .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (topMost?.target?.id) setActive(topMost.target.id);
}, { threshold: [0.2, 0.4, 0.6] });

sections.forEach(s => spy.observe(s));

// reveal animation
const revealEls = Array.from(document.querySelectorAll(".reveal"));
const revealObs = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) e.target.classList.add("is-in");
  }
}, { threshold: 0.15 });
revealEls.forEach(el => revealObs.observe(el));

// progress bar
function updateProgress(){
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
  if (progressBar) progressBar.style.width = `${Math.max(0, Math.min(100, pct))}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
