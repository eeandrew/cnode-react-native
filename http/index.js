export default class Http {
  static BASE_URL = 'https://cnodejs.org/api/v1/';

  static convertOjbToQuery(params) {
    let query = '?';
    for(let key in params) {
      if(params.hasOwnProperty(key)) {
        query = `${query}${key}=${params[key]}&`;
      }
    }
    return query;
  }

  static getTopics(params) {
    const query = Http.convertOjbToQuery(params);
    const url = `${Http.BASE_URL}topics${query}`;
    return fetch(url,{
      credentials: 'same-origin',
      method:'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((reponse)=>{
      return Promise.resolve(JSON.parse(reponse._bodyInit).data);
    })
    .catch((error)=>{
      return Promise.reject(JSON.stringify(error))
    })
  }
}