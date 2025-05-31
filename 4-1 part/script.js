// Toggle mobile nav menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Optional: Simple contact form submit handler (no real backend)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your message, ' + contactForm.name.value + '!');
  contactForm.reset();
});
