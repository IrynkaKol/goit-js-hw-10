//const BASE_URL = `https://restcountries.com/v3.1/name/`

export function fetchСountries (name) {
    //console.log(name);
    
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(resp => {
        //console.log(resp)
        if(!resp.ok){
            
            
  throw new Error(resp.statusText); //Страхуємо себе від того, що 404 помилка для браузера не є помилка
        }
        return resp.json();
    })//.then(data =>  console.log(data)) // data повернулась з resp.json
    .catch(err => console.error(err))
    
}
