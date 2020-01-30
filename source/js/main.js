const objectsLink = 'http://134.209.138.34/items';
const app = document.querySelector('#app');

const objects = fetch(objectsLink)
  .then(response => response.json())
  .then(objects => {
    return objects.map(object => ` <li class ='estate__item' data-id="${object.id}">
      <p class='estate__id'> ID: ${object.id}</p>
      <h3 class='estate__title'> ${object.title} </h3>
      <p class='estate__price'> Цена: ${object.price} </p>
      <p class='estate__address'> ${object.address} </p>
      <div class='estate__preview'>
        <img class='estate__img' src=${object.previewImage} alt='${object.title}'>
      </div>
    </li>`).join('');
  })
  .then(objectsString => {
    const estateList = document.createElement('ul');
    estateList.classList.add('estate__list');
    estateList.innerHTML = objectsString;
    estateList.addEventListener('click', evt => {
      const target = evt.target.closest('.estate__item');
      const id = target.getAttribute('data-id');
      const href = window.location.href;
      const lastSlashPos = href.lastIndexOf('/');
      window.location.href = `${href.slice(0, lastSlashPos)}/preview.html?id=${id}`;
    })

    app.appendChild(estateList);
  })
  .catch(err => console.error('Что-то пошло не так'))
