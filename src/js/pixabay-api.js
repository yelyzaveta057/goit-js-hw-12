import axios from 'axios';

const API_KEY = '49711703-11461993d80a106b3cce7e78b';
const BASE_URL = 'https://pixabay.com/api/';
let PER_PAGE = 15;
let page = 1;

export async function searchImages(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page: page,
      },
    });

    page += 1;

    return { images: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    console.error('Error fetching images:', error.message);
    return { images: [], totalHits: 0 };
  }
}

// Скидання  сторінок
export function resetPage() {
  page = 1;
}
