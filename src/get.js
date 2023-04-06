import axios from 'axios';

export class UnsplashAPI {
  q = null;
  page = 1;
  image_type = 'photo';
  orientation = 'horizontal';
  safesearch = true;
  per_page = 40;

  async getData() {
    try {
      return axios.get(
        `https://pixabay.com/api/?key=35067141-e641ff5dd074524f6628a17be&q=${this.q}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}&per_page=${this.per_page}&page=${this.page}`
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
