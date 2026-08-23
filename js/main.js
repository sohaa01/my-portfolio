// ============================================
// Soha — Portfolio site scripts
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  // ============================================
  // EmailJS initialization
  // ============================================

  emailjs.init({
    publicKey: "IxU-FeEv-IcAe1833",
  });


  // ============================================
  // Mobile hamburger menu
  // ============================================

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


  // ============================================
  // Animate skill bars into view
  // ============================================

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


  // ============================================
  // Contact form validation + EmailJS
  // ============================================

  const form = document.getElementById("contact-form");

  if (form) {

    const status = document.getElementById("form-status");


    // --------------------------------------------
    // Validation rules
    // --------------------------------------------

    const validators = {

      name: (v) =>
        v.trim().length >= 2 ||
        "Please enter your full name.",

      email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ||
        "Please enter a valid email address.",

      message: (v) =>
        v.trim().length >= 10 ||
        "Message should be at least 10 characters.",

    };


    // --------------------------------------------
    // Validate individual field
    // --------------------------------------------

    const validateField = (input) => {

      const rule = validators[input.name];

      if (!rule) return true;

      const result = rule(input.value);

      const field = input.closest(".field");

      const errorEl = field
        ? field.querySelector(".error-msg")
        : null;


      if (result === true) {

        field.classList.remove("invalid");

        return true;

      } else {

        field.classList.add("invalid");

        if (errorEl) {
          errorEl.textContent = result;
        }

        return false;
      }
    };


    // --------------------------------------------
    // Validate when leaving a field
    // --------------------------------------------

    form.querySelectorAll("input, textarea").forEach((input) => {

      input.addEventListener("blur", () => {
        validateField(input);
      });

    });


    // ============================================
    // Submit contact form
    // ============================================

    form.addEventListener("submit", async (e) => {

      e.preventDefault();


      // Validate all fields
      const inputs = [
        ...form.querySelectorAll("input, textarea")
      ];

      const allValid = inputs
        .map(validateField)
        .every(Boolean);


      // Stop if validation fails
      if (!allValid) {

        status.textContent =
          "Please fix the highlighted fields.";

        status.style.color = "#B4453A";

        status.classList.add("show");

        return;
      }


      // --------------------------------------------
      // Show sending message
      // --------------------------------------------

      status.textContent = "Sending message...";

      status.style.color = "#2F5D50";

      status.classList.add("show");


      // --------------------------------------------
      // Get form values
      // --------------------------------------------

      const name = form.querySelector('[name="name"]').value.trim();

      const email = form.querySelector('[name="email"]').value.trim();

      const message = form.querySelector('[name="message"]').value.trim();


      // --------------------------------------------
      // Send through EmailJS
      // --------------------------------------------

      try {

  const response = await emailjs.sendForm(
    "service_soha",
    "template_qd8ptcf",
    form
  );

  console.log(
    "EmailJS SUCCESS:",
    response.status,
    response.text
  );

  status.textContent =
    "Message sent successfully! Thank you.";

  status.style.color = "#2F5D50";

  status.classList.add("show");

  form.reset();

} catch (error) {

  console.error(
    "EmailJS ERROR:",
    error
  );

  status.textContent =
    "Sorry, your message could not be sent. Please try again.";

  status.style.color = "#B4453A";

  status.classList.add("show");

}


        console.log(
          "EmailJS SUCCESS:",
          response.status,
          response.text
        );


        // ----------------------------------------
        // Success message
        // ----------------------------------------

        status.textContent =
          "Message sent successfully! Thank you.";

        status.style.color = "#2F5D50";

        status.classList.add("show");


        // Clear form
        form.reset();


      } catch (error) {

        // ----------------------------------------
        // Error
        // ----------------------------------------

        console.error(
          "EmailJS ERROR:",
          error
        );


        status.textContent =
          "Sorry, your message could not be sent. Please try again.";

        status.style.color = "#B4453A";

        status.classList.add("show");

      }

    });

  }

});
