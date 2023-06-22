// -------- Кнопка меню-бургер
const initButtonMenu = () => {
  let navigationMain = document.querySelector(".main-navigation__inner");
  let navigationSwitch = document.querySelector(".main-navigation__toogle");

  navigationMain.classList.remove("main-navigation__inner--nojs");

  navigationSwitch.addEventListener("click", function () {
    if (navigationMain.classList.contains("main-navigation__inner--closed")) {
      navigationMain.classList.remove("main-navigation__inner--closed");
      navigationMain.classList.add("main-navigation__inner--opened");
    } else {
      navigationMain.classList.add("main-navigation__inner--closed");
      navigationMain.classList.remove("main-navigation__inner--opened");
    }
  });

  // -------- Кнопка в корзину. Модалка (catalog.html)
  let catalogBuyButton = document.querySelectorAll(".product__button-buy");
  let catalogModal = document.querySelector(".modal--close");


  for (let catalogBuyButtons of catalogBuyButton) {
    catalogBuyButtons.onclick = function () {
      catalogModal.classList.toggle("modal--close");
    };
  }
  let modalCloseButton = document.querySelector(".modal__button");

  modalCloseButton.onclick = function () {
    catalogModal.classList.add("modal--close");
  };

  // -------- Кнопка в корзину. Модалка (index.html)
  let featuredBuyButton = document.querySelector(".featured__button");
  let indexModal = document.querySelector(".modal--close");

  featuredBuyButton.onclick = function () {
    indexModal.classList.toggle("modal--close");
  }

  modalCloseButton.onclick = function () {
    indexModal.classList.add("modal--close");
  };

  // -------- Карта
  let map = document.querySelector(".contacts__map-image");

  map.classList.add("contacts__map-image--js");
}

export { initButtonMenu };
