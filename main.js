// ============================================
// Soha — Portfolio site scripts
// ============================================

// Mobile hamburger menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    // Close menu after clicking a link (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }
console.log("SKILL BAR JS RUNNING");
  
  // Animate skill bars into view
  const bars = document.querySelectorAll(".bar-fill");
  if (bars.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            fill.style.width = fill.dataset.level + "%";
            observer.unobserve(fill);
          }
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach((bar) => observer.observe(bar));
  }

  // Contact form validation
  const form = document.getElementById("contact-form");
  if (form) {
    const status = document.getElementById("form-status");

    const validators = {
      name: (v) => v.trim().length >= 2 || "Please enter your full name.",
      email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Please enter a valid email address.",
      message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters.",
    };

    const validateField = (input) => {
      const rule = validators[input.name];
      if (!rule) return true;
      const result = rule(input.value);
      const field = input.closest(".field");
      const errorEl = field.querySelector(".error-msg");
      if (result === true) {
        field.classList.remove("invalid");
        return true;
      } else {
        field.classList.add("invalid");
        if (errorEl) errorEl.textContent = result;
        return false;
      }
    };

    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = [...form.querySelectorAll("input, textarea")];
      const allValid = inputs.map(validateField).every(Boolean);

      if (!allValid) {
        status.textContent = "Please fix the highlighted fields.";
        status.style.color = "#B4453A";
        status.classList.add("show");
        return;
      }

      // No backend wired up yet — replace this with a real submit
      // (e.g. fetch() to Formspree, Netlify Forms, or your own API).
      status.textContent = "Message ready to send — connect a form backend to go live.";
      status.style.color = "#2F5D50";
      status.classList.add("show");
      form.reset();
    });
  }
});
