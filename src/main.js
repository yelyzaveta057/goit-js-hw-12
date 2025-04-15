import { searchImages } from './js/pixabay-api.js';
import { updateGallery, showNoResultsMessage } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

// лоадер спочатку прихований
loader.style.display = 'none';
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const query = input.value.trim();
  if (query === '') {
    showNoResultsMessage('Please enter a search query!');
    return;
  }

  gallery.innerHTML = ''; // очищаємо галерею перед новим пошуком
  loader.style.display = 'block'; // показуємо лоадер

  searchImages(query)
    .then(images => {
      loader.style.display = 'none'; // ховаємо лоадер після отримання результатів
      if (images.length === 0) {
        showNoResultsMessage(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }
      updateGallery(images);
    })
    .catch(error => {
      loader.style.display = 'none';
      showNoResultsMessage('Error fetching images. Please try again!');
      console.error('Помилка сервера:', error.message);
    });
  form.reset();
});
