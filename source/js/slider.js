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
}

export { initButtonMenu };
