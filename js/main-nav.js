const navToggle = document.querySelector('.page-header__toggle');
const navMain = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav__link');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    navToggle.classList.add('page-header__toggle--opened');
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].tabIndex = 0;
    }
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    navToggle.classList.remove('page-header__toggle--opened');
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].tabIndex = -1;
    }
  }
});
