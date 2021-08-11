import { default as galleryItems } from './app.js';

const refs = {
  galleryRef: document.querySelector('.gallery.js-gallery'),
  lightboxRef: document.querySelector('.lightbox.js-lightbox'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
};

//console.log(galleryItems);
//*Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
function createElements(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }, idx) => {
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
      data-index="${idx}"
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

//*Реализация делегирования на галерее
refs.galleryRef.addEventListener('click', handleTargetItemClick);
// refs.galleryRef.removeEventListener('click', handleTargetItemClick);

function handleTargetItemClick(e) {
  e.preventDefault();
  const isGalleryImg = e.target.classList.contains('gallery__image');
  if (!isGalleryImg) {
    return;
  }
  const targetImageIdx = e.target.dataset.index;
  const originalSizeImage = e.target.dataset.source;
  const descriptionImage = e.target.alt;
  //console.log(targetImageIdx);
  //console.log(originalSizeImage);
  //console.log(descriptionImage);
}
//*

// function onTargetButtonClick() {
//   console.log('клик');
// }
// function onKeyPress(e) {
//   //keypress
//   console.log(e.key);
// }
