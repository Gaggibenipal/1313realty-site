// Toggle nav background on scroll
window.addEventListener('scroll', () => {
  document.querySelector('.nav').classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('active');
});

// Testimonials slider
const testimonials = document.querySelectorAll('.testimonial-slider blockquote');
let currentTestimonial = 0;
function showTestimonial(index) {
  testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
}
document.getElementById('nextTestimonial').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});
document.getElementById('prevTestimonial').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});
