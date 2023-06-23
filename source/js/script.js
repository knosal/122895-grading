/* в этот файл добавляет скрипты*/
import { mapDisplay, mapDisplayNoJs } from './map.js';
import { initButtonMenu } from './popup-menu.js';
import { initRangeSlider } from './range-slider.js';
import { initSelect } from './select.js';

initSelect();
mapDisplayNoJs();
mapDisplay();
initButtonMenu();
initRangeSlider();

