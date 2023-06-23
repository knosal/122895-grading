const mapDisplay = () => {
  var map = L.map('map').setView([59.96840, 30.31772], 18);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([59.96840, 30.31772]).addTo(map)
};

const mapDisplayNoJs = () => {
  let mapNoJs = document.querySelector(".main-container__map-image");
  mapNoJs.classList.add("main-container__map-image--js");
}

export { mapDisplay, mapDisplayNoJs };
