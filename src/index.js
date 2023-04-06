import axios from 'axios';
import { UnsplashAPI } from './get';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
const listEl = document.querySelector('.gallery-list');
const btnEl = document.querySelector('.btn-more');

var lightbox = new SimpleLightbox('.gallery-list a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  scrollZoom: false,
  download: 'string',
});

const unsplashAPI = new UnsplashAPI();

function crateImageEl(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <a class='gallery__item' href='${largeImageURL}'>
  <img
    class='gallery__image'
    src='${webformatURL}'
    alt='${tags}'
    data-source='${webformatURL}'
    loading="lazy"
  />
    <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</a>
      `;
      }
    )
    .join('');
}

function addElements(data) {
  let { hits } = data.data;

  let cardsMarcup = crateImageEl(hits);

  listEl.insertAdjacentHTML('beforeend', cardsMarcup);
}

const addList = async event => {
  event.preventDefault();

  btnEl.classList.add('is-hidden');

  listEl.innerHTML = '';

  if (inputEl.value === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  unsplashAPI.q = inputEl.value.trim();

  inputEl.value = '';

  try {
    const data = await unsplashAPI.getData();

    if (data.data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (data.data.totalHits === unsplashAPI.page) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);

    addElements(data);

    btnEl.classList.remove('is-hidden');

    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }
};

const loadMore = async () => {
  unsplashAPI.page += 1;

  try {
    const data = await unsplashAPI.getData();

    addElements(data);

    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }
};

formEl.addEventListener('submit', addList);
btnEl.addEventListener('click', loadMore);
