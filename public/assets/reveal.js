const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce && "IntersectionObserver" in window) {
  // Moment sections run their own choreography, so they are left alone.
  const targets = document.querySelectorAll(
    [
      "main > section:not(.hero):not(#marca):not(#piloto) .wrap > *",
      "main > section:not(.hero):not(#marca):not(#piloto) .card",
      ".footer .wrap > *",
    ].join(","),
  );

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  for (const el of targets) {
    el.classList.add("reveal");
    io.observe(el);
  }
  document.documentElement.classList.add("js-reveal");
}
