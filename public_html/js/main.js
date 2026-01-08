// ============================
// Absolute Healing - main.js
// ============================

// === Smooth Scroll for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href) return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === Back to Top Button ===
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
}

// === Testimonials Carousel ===
const slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove('active'));
  if (slides[i]) slides[i].classList.add('active');
}

const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

if (nextBtn && prevBtn && slides.length > 0) {
  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  // Auto-rotate every 6 seconds
  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 6000);
}

// === Form Validation for Contact & Workshop Forms (Formspree-safe) ===
function setupFormValidation(options) {
  const form = document.getElementById(options.formId);
  if (!form) return;

  const nameInput = document.getElementById(options.nameId);
  const emailInput = document.getElementById(options.emailId);
  const messageInput = document.getElementById(options.messageId);

  // More reliable email check than the old {2,3} TLD limit
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form.addEventListener("submit", (e) => {
    const name = (nameInput?.value || "").trim();
    const email = (emailInput?.value || "").trim();
    const message = (messageInput?.value || "").trim();

    // Validate
    if (!name || !email || !message) {
      e.preventDefault();
      alert("⚠️ Please fill out all fields before submitting.");
      return;
    }

    if (!emailPattern.test(email)) {
      e.preventDefault();
      alert("⚠️ Please enter a valid email address.");
      emailInput?.focus();
      return;
    }

    // ✅ Valid: allow the normal POST to Formspree
    // Optional UX: show a sending state (doesn't block submit)
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent || "Submit";
      submitBtn.textContent = "Sending...";
    }
  });
}

// Contact form IDs (contact.html)
setupFormValidation({
  formId: "contactForm",
  nameId: "contact-name",
  emailId: "contact-email",
  messageId: "contact-message",
});

// Workshop form IDs (workshops.html)
setupFormValidation({
  formId: "workshopForm",
  nameId: "workshop-name",
  emailId: "workshop-email",
  messageId: "workshop-message",
});

// === READ MORE BUTTON FUNCTIONALITY + Reveal on Scroll ===
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".read-more");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // safer than previousElementSibling (handles whitespace/text nodes)
      const moreText = btn.parentElement?.querySelector(".more");
      if (!moreText) return;

      const isExpanded = btn.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        moreText.style.display = "none";
        btn.textContent = "Read more";
        btn.setAttribute("aria-expanded", "false");
      } else {
        moreText.style.display = "block";
        btn.textContent = "Show less";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // === Animate cert strip on scroll ===
  const revealItems = document.querySelectorAll('.reveal-on-scroll');

  if (revealItems.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('is-visible'));
  }
});
