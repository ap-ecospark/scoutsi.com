/* Scoutsi — site scripts */

(function () {
  "use strict";

  // ---- FAQ, contact form, nav, reveals, menu, smooth-scroll ----
  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    q.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      // close siblings for cleaner read
      document.querySelectorAll(".faq-item.open").forEach((o) => {
        if (o !== item) o.classList.remove("open");
      });
      item.classList.toggle("open", !wasOpen);
    });
    // keyboard accessibility
    q.setAttribute("tabindex", "0");
    q.setAttribute("role", "button");
    q.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        q.click();
      }
    });
  });

  // Contact form — mailto fallback so it works on any static host
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fname = form.fname.value.trim();
      const lname = form.lname.value.trim();
      const email = form.email.value.trim();
      const query = form.query.value.trim();
      if (!fname || !lname || !email || !query) {
        status.textContent = "Please fill all required fields.";
        status.classList.add("show", "error");
        return;
      }
      const subject = encodeURIComponent(`Scoutsi enquiry — ${fname} ${lname}`);
      const body = encodeURIComponent(
        `${query}\n\n—\n${fname} ${lname}\n${email}`,
      );
      window.location.href = `mailto:info@scoutsi.com?subject=${subject}&body=${body}`;
      status.textContent = "Opening your email client…";
      status.classList.remove("error");
      status.classList.add("show");
    });
  }

  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  reveals.forEach((el) => io.observe(el));

  const hbg = document.getElementById("hbg");
  const links = document.querySelector(".nav-links");
  if (hbg) {
    hbg.addEventListener("click", () => {
      if (links.style.display === "flex") {
        links.style.display = "";
      } else {
        links.style.display = "flex";
        links.style.flexDirection = "column";
        links.style.position = "absolute";
        links.style.top = "72px";
        links.style.left = "0";
        links.style.right = "0";
        links.style.background = "rgba(6,8,15,0.98)";
        links.style.padding = "1.5rem 2rem";
        links.style.borderBottom = "1px solid rgba(255,255,255,0.07)";
        links.style.gap = "1.2rem";
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        const el = document.querySelector(id);
        const y = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    });
  });

  // ---- FAQ section accordion ----
  (function () {
    var sections = document.querySelectorAll(".faq-section");
    sections.forEach(function (sec, idx) {
      // Add arrow indicator
      var arrow = document.createElement("span");
      arrow.className = "faq-acc-arrow";
      arrow.textContent = "+";
      sec.appendChild(arrow);

      sec.addEventListener("click", function () {
        var isOpen = sec.classList.contains("open");
        // Close all
        sections.forEach(function (s) {
          s.classList.remove("open");
        });
        document.querySelectorAll(".faq-item").forEach(function (item) {
          item.classList.remove("visible");
        });
        if (!isOpen) {
          sec.classList.add("open");
          // Show all .faq-item siblings until next .faq-section
          var el = sec.nextElementSibling;
          while (el && !el.classList.contains("faq-section")) {
            if (el.classList.contains("faq-item")) el.classList.add("visible");
            el = el.nextElementSibling;
          }
        }
      });
    });
    // Open first section by default
    if (sections.length) sections[0].click();
  })();

  // ---- Back-to-top button ----
  (function () {
    var btn = document.getElementById("btt");
    window.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true },
    );
  })();
})();
