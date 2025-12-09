// Select elements
const menu = document.querySelector('nav');
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');

// Open menu
menuBtn.addEventListener('click', () => {
  menu.classList.add('active');
});

// Close menu
closeBtn.addEventListener('click', () => {
  menu.classList.remove('active');
});