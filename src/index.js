import './css/styles.css'
import galleryItems from './references/images.js'

const refs = {
  galleryItem: document.querySelector('.js-gallery'),
  image: document.createElement('img'),
  lightbox: document.querySelector('.lightbox'),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  modal: document.querySelector('.lightbox__content'),
  lightbox__image: document.querySelector('.lightbox__image'),
  overlay: document.querySelector('.lightbox__overlay'),
}
const { modal, btn, galleryItem, lightbox__image, lightbox, image, overlay } = refs

function createGalleryImg({ preview, original, description }) {
  return  `<li class="gallery__item">
<a
  class="gallery__link"
  href=${original}
>
  <img
    class="gallery__image"
    src=${preview}
    data-source=${original}
    alt=${description}
  />
</a>
</li>`}
const galleryMarkup =  galleryItems
    .reduce((acc, item) => acc + createGalleryImg(item),
  ""
)
galleryItem.insertAdjacentHTML('afterbegin', galleryMarkup)
galleryItem.addEventListener("click", createGalleryImg)
image.classList.add('gallery__image')  
//    return array
//     .map(({ preview, original, description }) => {
//       // const { preview, original, description } = elem
//         return `<li class="gallery__item">
//               <a
//                 class="gallery__link"
//                 href=${original}>
//               <img
//                 class="gallery__image"
//                 src=${preview}
//                 data-source=${original}
//                 alt=${description}
//               />
//               </a>
//               </li>
//               `;
//         })
//     .join('')
// }

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  lightbox.classList.add('is-open')
}

galleryItem.addEventListener('click', onImgClick)

function onImgClick(e) {
   e.preventDefault();
   if (e.target.nodeName !== 'IMG') {
    
    return;
  }
  if (e.target.nodeName === "IMG") {
    onOpenModal()
   lightbox__image.src = e.target.getAttribute('data-source');
  lightbox__image.alt = e.target.alt;
  }
}

function closeModalByClick() {
  lightbox.classList.remove('is-open')
  lightbox__image.src = '';
  lightbox__image.alt = '';
  btn.addEventListener('click', closeModalByClick)
}
 
overlay.addEventListener('click', onBackdropClick)
function onBackdropClick(event) {
  if (event.currentTarget === event.target ) {
    closeModalByClick();
  }

}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModalByClick();
  }
}

window.addEventListener('keydown', onSliderClick)
  function onSliderClick(eve) {
   if (lightbox.classList[2]) {
    const mapGallery = galleryItems.map(value => value.original)
    const indexImg = Number(mapGallery.indexOf(lightbox__image.src))
    if (eve.code === 'ArrowLeft' || eve.code === 'ArrowUp') {
      if (eve.target.className === image.className) {
        return;
      }
      const indexLeft = indexImg - 1
      if (indexImg === 0) {
        return;
      }
      lightbox__image.src = mapGallery[indexLeft]
    }

    if (eve.code === 'ArrowRight' || eve.code === 'ArrowDown') {
      if (eve.target.className === image.className) {
        return;
      }
      const indexRight = indexImg + 1
      if (indexRight === mapGallery.length) {
        return;
      }
      lightbox__image.src = mapGallery[indexRight]
    }
  }
}
