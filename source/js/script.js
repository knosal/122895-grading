/* в этот файл добавляет скрипты*/
import { mapDisplay, mapDisplayNoJs } from './map.js';
import { initButtonMenu } from './popup-menu.js';
import { initRangeSlider } from './range-slider.js';
import { initSelect } from './select.js';
//import { initSliderSwiper } from './slider-swiper.js';

initSelect();
mapDisplayNoJs();
mapDisplay();
initButtonMenu();
initRangeSlider();
//initSliderSwiper();
