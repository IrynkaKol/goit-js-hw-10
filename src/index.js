import './css/styles.css';
import { fetchСountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const input = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;


input.addEventListener('input', 
debounce(e => {
    const trimmedValue = input.value.trim(); //ввод інпуту
    console.log(trimmedValue)
    clearHtml();

    if (trimmedValue !== '') {
fetchСountries(trimmedValue).then(data => {
    console.log(data)
    
    if(data.lenght > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');

    } else if (data.length >= 2 && data.lenght <= 10) {
        renderCountryList(data);

    } else if (data.length=== 1) {
    renderOneCountry(data);
    } 
});
    }
}, DEBOUNCE_DELAY)
);


function renderCountryList(countries) {
    const markup = countries
      .map(country => {
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${
          country.name
        }" width="30" hight="20">
           <b>${country.name}</p>
                  </li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  }




function renderOneCountry(countries) {
    const markup = countries
      .map(country => {
        return `<li>
    <img src="${country.flags.svg}"
    alt="Flag of ${country.name.common}"
    width="30" hight="20">
       <h1>${country.name.common}</h1>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${Object.values(country.languages)} </p>
              </li>`;
      }).join('');
      
    countryList.innerHTML = markup;
}


   
    function clearHtml() {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      }