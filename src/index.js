import axios from 'axios';
import { UnsplashAPI } from './get';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
const listEl = document.querySelector('.gallery-list');
const btnEl = document.querySelector('.btn-more');

const unsplashAPI = new UnsplashAPI();

formEl.addEventListener('submit', addList);
btnEl.addEventListener('click', () => {
  unsplashAPI.page += 1;
});

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

var lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  scrollZoom: false,
});

function addList(event) {
  event.preventDefault();

  listEl.innerHTML = '';

  if (inputEl.value === '') {
    return;
  }

  unsplashAPI.q = inputEl.value.trim();
  console.log(unsplashAPI.q);
  inputEl.value = '';

  unsplashAPI
    .getData()
    .then(data => {
      let { hits } = data.data;

      console.log(data);

      let cardsMarcup = crateImageEl(hits);

      listEl.insertAdjacentHTML('beforeend', cardsMarcup);

      btnEl.classList.remove('is-hidden');
    })
    .catch(err => {
      console.log(err);
    });
}
