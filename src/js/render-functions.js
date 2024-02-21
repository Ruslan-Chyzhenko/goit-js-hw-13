import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from "../main";

let galleryA;

function galleryTemplate({
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
}) {
    return `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info-box">
            <p>Likes:<span> ${likes}</span></p>
            <p>Views:<span> ${views}</span></p>
            <p>Comments:<span> ${comments}</span></p>
            <p>Downloads:<span> ${downloads}</span> </p>
        </div>
    </li>`;
}

export function renderGalleryItem(images) {
    const markup = images.map(galleryTemplate).join('');
    refs.gallery.insertAdjacentHTML("beforeend", markup);
   
    if (!galleryA) {
        initializeSimpleLightbox();
    } else {
        refreshSimpleLightbox();
    }
}

function initializeSimpleLightbox() {
    galleryA = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
        captionPosition: 'bottom',
    });
}

function refreshSimpleLightbox() {
    galleryA.refresh();
}