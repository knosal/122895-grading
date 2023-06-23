const initSelect = () => {
  const selectSingle = document.querySelector('.sorting__inner');
  const selectSingle_title = selectSingle.querySelector('.sorting__active');
  const selectSingle_labels = selectSingle.querySelectorAll('.sorting__label');

  selectSingle_title.addEventListener('click', () => {
    if ('active' === selectSingle.getAttribute('data-state')) {
      selectSingle.setAttribute('data-state', '');
    } else {
      selectSingle.setAttribute('data-state', 'active');
    }
  });

  for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (evt) => {
      selectSingle_title.textContent = evt.target.textContent;
      selectSingle.setAttribute('data-state', '');
    });
  }
}

export { initSelect };
