import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { renderGalleryItem } from "./js/render-functions";
import { getImages, Per_Page } from "./js/pixabay-api";

export let searchQuery = '';
export let pageOf = 1;

export const refs = {
    formEl: document.querySelector('.form'),
    inputEl: document.querySelector('.query'),
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
    btnLoad: document.querySelector('.load-more-btn'),
};

const galleryItem = refs.gallery.querySelector('.gallery-item');

refs.formEl.addEventListener("submit", handleSubmit);
refs.btnLoad.addEventListener("click", handleLoadMoreClick);

async function handleSubmit(event) { 
    event.preventDefault();
    pageOf = 1;
    createLoader();
    const query = event.target.elements.query.value;
    searchQuery = query.trim();
    
    if (!searchQuery) {
        showNotification('Please fill in the input field');
        return;
    }

    try {
        resetGallery();
        const data = await getImages(pageOf, searchQuery);

        if (data.hits.length > 0) {
            renderGalleryItem(data.hits);
            showLoadMoreBtn();
            scrollToGallery();
        } else {
            resetGallery();
            hideLoadMoreBtn();
            showNotification('Sorry, there are no images matching your search query. Please try again!');
        }
        SearchResults(data.totalHits, pageOf);
    } catch (error) {
        console.error('Error data:', error);
        if (error.message.includes('network')) {
            showNotification('Please check your internet connection');
        } else {
            showNotification('An error occurred. Please try again later.');
        }
    } finally {
        createLoader();
        event.target.reset();
    }
}

async function handleLoadMoreClick() {
    createLoader();
    pageOf += 1;
    const data = await getImages(pageOf, searchQuery);
    renderGalleryItem(data.hits);
    SearchResults(data.totalHits, pageOf);
    createLoader();
}

function createLoader() {
    refs.loader.classList.toggle('hidden');
}

function showNotification(message) {
    iziToast.show({
        message,
        messageColor: '#FFFFFF',
        backgroundColor: '#B51B1B',
        position: 'topRight',
    });
}

function showLoadMoreBtn() {
    refs.btnLoad.style.display = "block";
}

function hideLoadMoreBtn() { 
    refs.btnLoad.style.display = "none";
}

function scrollToGallery() {
    if (galleryItem) {
        const galleryItemHeight = galleryItem.getClientRect().height;
        window.scrollBy({
            top: galleryItemHeight * 2,
            behavior: 'smooth',
        });
    }
}

function resetGallery() {
    refs.gallery.innerHTML = '';
    hideLoadMoreBtn();
}

function SearchResults(totalHits, pageOf) {
    const maxPage = Math.ceil(totalHits / Per_Page);
    if (maxPage === pageOf) {
        hideLoadMoreBtn();
        showNotification("We're sorry, but you've reached the end of search results.");
    }
} 