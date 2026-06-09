const skillGroups = document.querySelectorAll('.skill-group');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
skillGroups.forEach(g => obs.observe(g));
