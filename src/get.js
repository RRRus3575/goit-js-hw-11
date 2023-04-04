import axios from 'axios';

export class UnsplashAPI {
  q = null;

  getData() {
    return axios.get(
      'https://pixabay.com/api/?+35067141-e641ff5dd074524f6628a17be+',
      {
        q: this.q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      }
    );
  }
}
