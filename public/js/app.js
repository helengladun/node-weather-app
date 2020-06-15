const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const errorParagraph = document.getElementById('error');
const locationParagraph = document.getElementById('location');
const loadingParagraph = document.getElementById('loading');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = searchInput.value;

  locationParagraph.textContent = '';
  errorParagraph.textContent = '';
  loadingParagraph.textContent = 'Loading...';

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
      response.json()
        .then(({error, location, forecast} = {}) => {
          loadingParagraph.textContent = '';
          if (error) {
            errorParagraph.textContent = error;
          } else {
            locationParagraph.textContent = `${location} ${forecast}`;
          }
        })
    });
});



