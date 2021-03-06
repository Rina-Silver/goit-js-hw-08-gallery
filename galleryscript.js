import { default as galleryItems } from './app.js';

const refs = {
  galleryRef: document.querySelector('.gallery.js-gallery'),
  lightboxRef: document.querySelector('.lightbox.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxImg: document.querySelector('.lightbox__image'),
};

let targetImageIdx;

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

function handleTargetItemClick(e) {
  e.preventDefault();
  const isGalleryImg = e.target.classList.contains('gallery__image');
  if (!isGalleryImg) {
    return;
  }
  targetImageIdx = e.target.dataset.index;
  const originalSizeImage = e.target.dataset.source;
  const descriptionImage = e.target.alt;
  //console.log(targetImageIdx);
  //console.log(originalSizeImage);
  //console.log(descriptionImage);

  onOpenModal(originalSizeImage, descriptionImage, targetImageIdx);
}
//*

//*Открытие модального окна по клику на элементе галереи.
function onOpenModal(size, description, idx) {
  window.addEventListener('keydown', onKeyPress);
  refs.closeModalBtn.addEventListener('click', onCloseModal);
  refs.lightboxOverlay.addEventListener('click', onCloseModal);
  refs.lightboxRef.classList.add('is-open');
  refs.lightboxImg.src = size;
  refs.lightboxImg.alt = description;
  refs.lightboxImg.dataset.index = idx;
}
//*
function onCloseModal() {
  refs.lightboxRef.classList.remove('is-open');
  refs.lightboxImg.src = '';
  refs.lightboxImg.alt = '';
  refs.lightboxImg.dataset.index = '';

  window.removeEventListener('keydown', onKeyPress);
  refs.closeModalBtn.removeEventListener('click', onCloseModal);
  refs.lightboxOverlay.removeEventListener('click', onCloseModal);
}

//*Закрытие модального окна по клику на div.lightbox__overlay
// function onOverlayClick(e) {
//   if (e.currentTarget === e.target) {
//     onCloseModal();
//   }
// }
//*

//* Закрытие модального окна по нажатию клавиши ESC

//*Пролистывание изображений галереи в открытом модальном окне
function showNextImg(idx) {
  const nextElem = document.querySelector(
    `.gallery__image[data-index='${idx}']`
  );

  const originalSizeImage = nextElem.dataset.source;
  const descriptionImage = nextElem.alt;
  onOpenModal(originalSizeImage, descriptionImage, idx);
}

function onKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
    return;
  }
  let idx = refs.lightboxImg.dataset.index;
  if (e.key === 'ArrowLeft' && idx > 0) {
    --idx;
    showNextImg(idx);
  }
  if (e.key === 'ArrowRight' && idx < galleryItems.length - 1) {
    idx++;
    showNextImg(idx);
  }
}
//*
