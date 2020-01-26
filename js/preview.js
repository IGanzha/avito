const objectInfoLink = 'http://134.209.138.34/item';
const app = document.querySelector('#app');
const url = new URL(window.location.href);
const id = url.searchParams.get('id');

const objectInfo = fetch(`${objectInfoLink}/${id}`)
  .then(response => response.json())
  .then(array => array[0])
  .then(object => {
    const photos = object.images.map(image => {
      return `<img src='${image}' alt=''>`
    }).join('');

    return `
      <p>ID: ${object.id}</p>
      <h3>${object.title}</h3>
      <p>${object.price}</p>
      <address>${object.address}</address>
      <div>${photos}</div>
    `;
  })
  .then( advert => {
    const objectInfo = document.createElement('div');
    objectInfo.innerHTML = advert;
    
    app.appendChild(objectInfo);

  })
  .catch(err => console.error('Что-то пошло не так'));


// [{
//   "id":1849621339,
//   "address":"Спартаковская ул., 5/7",
//   "title":"2-к квартира, 85.5 м², 13/24 эт.",
//   "price":"14 150 000 руб.",
//   "description":"Продается 2 комнатная квартира, Общая площадь 85,5 кв.м . Квартира расположена на 13 этаже 22 этажного моно-кирпичного дома, построенного в 2002 году. 2 изолированные комнаты (20 и 15 кв.м.), кухня –столовая 16 кв.м., отличное состояние, полностью готова для проживания (оставляем всю мебель и технику), сделан косметический ремонт, полы в комнатах паркет, кухня – кафель, коридор кафель и ламинат, 2 кондиционера.",
//   "sellerName":"Анна",
//   "images":["http://134.209.138.34/images/large/6329074398.jpg","http://134.209.138.34/images/large/6329074586.jpg","http://134.209.138.34/images/large/6329075095.jpg","http://134.209.138.34/images/large/6329075174.jpg"]
// }]