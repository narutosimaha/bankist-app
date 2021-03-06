'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const link1 = document.querySelector('.sexy');

link1.setAttribute(
  'href',
  'https://narutosimaha.github.io/trillo-learning/gallery.html'
);
link1.setAttribute('target', '__blank');

btnsOpenModal.forEach(el => {
  el.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button Scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (X/Y)', pageXOffset, pageYOffset);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling;
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     // const targetScroll = document.querySelector(el.getAttribute('href'));
//     // targetScroll.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target.classList);
  e.preventDefault();
  //Matchinh strategy
  if (e.target.classList.contains('nav__link')) {
    const targetScroll = document.querySelector(e.target.getAttribute('href'));
    targetScroll.scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

// console.log(tabs);

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //Guard clause
  if (!clicked) return;

  const contentNumber = clicked.dataset.tab;

  //Remove active classes
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  //Active tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document
    .querySelector(`.operations__content--${contentNumber}`)
    .classList.add('operations__content--active');
});

const handleHover = function (opa, e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opa;
    });
    logo.style.opacity = opa;
  }
};

///////////////////////////////////////
// Menu fade animation

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(null, 0.5));
nav.addEventListener('mouseout', handleHover.bind(null, 1));

///////////////////////////////////////
// Sticky navigation

// SOLUTION 1
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// console.log(window.scrollY);
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// SOLUTION 2

//Example
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null, //observe the target element if it intersecs with VIEWPORT
//   threshold: 0.3, //Persentage at which the observe callback function will be called when the targeted element intersects with the root element
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
const header = document.querySelector('.header');
// const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${getComputedStyle(nav).height}`,
});
headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

///////////////////////////////////////
// Lazy image
const images = document.querySelectorAll('.features__img');

const uploadImage = function (entries, observer) {
  const [entry] = [...entries];
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(uploadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

images.forEach(el => {
  imageObserver.observe(el);
});

///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = Math.floor(slides.length / 2);
  const maxSlide = slides.length;

  // FUnctions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    const buttons = document.querySelectorAll('.dots__dot');
    buttons.forEach(el => {
      if (Number(el.dataset.slide) === slide) {
        return el.classList.add('dots__dot--active');
      }

      el.classList.remove('dots__dot--active');
    });
  };
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
    activeDot(slide);
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide >= maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  // Previous slide
  const preSlide = function () {
    if (curSlide <= 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };
  const init = function () {
    createDots();
    goToSlide(curSlide);
  };
  init();
  //Event handler;
  btnLeft.addEventListener('click', preSlide);
  btnRight.addEventListener('click', nextSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') preSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;
    const slide = Number(e.target.dataset.slide);
    goToSlide(slide);
  });
};
slider();
// 0->b     (-b)/2 -> (b)/2
///////////////////////////////////////
// LECTURE
// //Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements;
// //.insertAdjacentHTML
// // document
// //   .querySelector('.header__title h4')
// //   .insertAdjacentHTML('afterend', '<h4>Em ?????p l???m</h4>');

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookied for imp';
// message.innerHTML =
//   "We use cookied for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";

// // header.prepend(message); //add the element as the fist child
// header.append(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);

// //Delete elements;
// message
//   .querySelector('.btn.btn--close-cookie')
//   .addEventListener('click', () => {
//     message.remove();
//   });

// //////////////////////////////
// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';
// // console.log(Number.parseFloat(getComputedStyle(message).height));

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// //Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// // console.log(logo.src);
// console.log(logo.className);
// logo.alt = 'Beautiful minimalist logo';

// //Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');
// logo.setAttribute('designer', 'Tho Nguyen');

// logo.getAttribute('src');
// console.log(logo.src);

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// //Data attributes
// console.log(logo.dataset.versionVu);

// //Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// // Don't use
// logo.className = 'jonas';

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! Ydasd');
//   h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);

// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! Ydasd');
// };

//rgb(255,255,255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log(this);
//   this.style.backgroundColor = randomColor();
//   console.log('Target', e.target, e.currentTarget);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // this.style.backgroundColor = randomColor();
//   console.log('Container', e.target, e.currentTarget);
//   e.stopPropagation();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NaV', e.target, e.currentTarget);
// });

// const h1 = document.querySelector('h1');

// //Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'black';

// //Going upwards:parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // Going  sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement.children);

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML paads', e);
}); //get fired when HTML is parsed

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
}); //get fired when HTML,css and all other resources  are parsed

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ''; //Display leaving confirmation
// });
