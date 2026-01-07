// === Smooth Scroll for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
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

// === Form Validation for Contact & Workshop Forms ===
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', e => {
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!name || !email || !message) {
      alert("⚠️ Please fill out all fields before submitting.");
      e.preventDefault();
    } else if (!email.match(emailPattern)) {
      alert("⚠️ Please enter a valid email address.");
      e.preventDefault();
    } else {
      alert("✅ Thank you, your message has been sent!");
    }
  });
}

validateForm('contactForm');
validateForm('workshopForm');

// === READ MORE BUTTON FUNCTIONALITY ===
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".read-more");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // safer than previousElementSibling (handles whitespace/text nodes)
      const moreText = btn.parentElement.querySelector(".more");
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
