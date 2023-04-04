import axios from 'axios';
import { UnsplashAPI } from './get';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
const listEl = document.querySelector('.gallery-list');

const unsplashAPI = new UnsplashAPI();

formEl.addEventListener('submit', addList);

function addList(event) {
  event.preventDefault();

  unsplashAPI.q = inputEl.value.trim();

  unsplashAPI
    .getData()
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
}
