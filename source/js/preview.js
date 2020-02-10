const objectInfoLink = 'http://134.209.138.34/item';
const app = document.querySelector('#app');
const url = new URL(window.location.href);
const id = url.searchParams.get('id');
console.log(`${objectInfoLink}/${id}#photo0`)
const objectInfo = fetch(`${objectInfoLink}/${id}`)
  .then(response => response.json())
  .then(array => array[0])
  .then(object => {
    const previews = object.images.map((image, i) => {
      return `<a href='#photo${i}' class='preview__link'><img src='${image}' class='preview__image' alt=''></a>`
    }).join('');

    const photos = object.images.map((image,i) => {
      return `
        <div class='photo-block' id='photo${i}'>
          <a class="gallery__link-prew" href='#photo${i-1}'>Предыдущая</a>
          <img src='${image}' class='gallery__image' alt=''>
          <a class="gallery__link-next" href='#photo${i+1}'>Следующая</a>
        </div>
        `
    }).join('');

    return `
      <div class='advert__info'>
        <p class='advert-id'>ID: ${object.id}</p>
        <h3 class='advert-title'>${object.title}</h3>
        <p class='advert-price'> Цена: ${object.price}</p>
        <address> Адрес: ${object.address}</address>
        <p class='advert-seller'> Продавец: ${object.sellerName}</p>
        <p class='advert-description'> Описание: ${object.description}</p>
        <div class='advert-previews'>${previews}</div>
      </div>
      <div class='advert__gallery gallery'> ${photos}</div>
    `;
  })
  .then( advert => {
    const fragment = document.createDocumentFragment();
    const objectInfo = document.createElement('div');
    objectInfo.classList.add('advert');
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

