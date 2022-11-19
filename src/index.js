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
    clearHtml()

fetchСountries(trimmedValue).then(data => renderOneCountry(data))
  
}, DEBOUNCE_DELAY)
);


    

    
  

//fetchСountries(searchQuery)
//.then(renderCountryCard)
//.catch(onFetchError)
//.finally(() => form.reset());










function renderOneCountry(countries) {
    const markup = countries
      .map(country => {
        return `<li>
    <img src="${country.flags.svg}"
    alt="Flag of ${country.name}"
    width="30" hight="20">
       <h1>${country.name}</h1>
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