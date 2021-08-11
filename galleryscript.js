import { default as galleryItems } from './app.js';

const refs = {
  galleryRef: document.querySelector('.gallery.js-gallery'),
};

//console.log(galleryItems);
//*Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
function createElements(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
    })
    .join('');
}

refs.galleryRef.insertAdjacentHTML('beforeend', createElements(galleryItems));
//*

// refs.galleryRef.addEventListener('click', handleTargetItemClick);
// refs.galleryRef.removeEventListener('click', handleTargetItemClick);

// function handleTargetItemClick(e) {
//   console.log(e.target);
// }
// function onTargetButtonClick() {
//   console.log('клик');
// }
// function onKeyPress(e) {
//   //keypress
//   console.log(e.key);
// }
