// import Swiper bundle with all modules installed
import Swiper, { Navigation, Pagination } from 'swiper';

const initSliderSwiper = () => {
  // init Swiper:
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],

    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

export { initSliderSwiper };
