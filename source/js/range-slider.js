const initRangeSlider = () => {
  const rangeSlider = document.getElementById('range-slider');

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [0, 123],
      connect: true,
      step: 1,
      range: {
          'min': [0],
          'max': [150]
      }
    });

    const input0 = document.getElementById('input-0');
    const input1 = document.getElementById('input-1');

    const inputs = [input0, input1];

    rangeSlider.noUiSlider.on('update', function(values, handle) {
      inputs[handle].value = Math.round(values[handle]);
    });
  }
}


export { initRangeSlider };
