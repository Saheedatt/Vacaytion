const propertyDOM = document.querySelector('.explore');
const url = 'https://bayut.p.rapidapi.com/properties/detail';

const fetchData = async () => {
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'effd046944mshab918ceb096ff70p104d4cjsnd580b285ad6c',
          'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
        },
    };
  try {
    propertyDOM.innerHTML = '<h4 class="product-loading">Loading... </h4>';
    //console.log(window.location.search);
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const response = await fetch(url, options);
    const result = await response.json();
    return result.hits;
  } catch (error) {
    propertyDOM.innerHTML =
      '<p class="error">There was a problem loading the product. Please try again later </p>';
  }
};

const displayProperties= (properties) => {
  const {
    title,
    description,
    price,
    location,
    phoneNumber,
    contactName,
    agency,
  } = properties;
  const imageUrl = properties.coverPhoto ? properties.coverPhoto.url : '';
  document.title = title.toUpperCase();



  productDOM.innerHTML = `<div class="product-wrapper">
        <img src="${imageUrl}" class="img" alt="${title}" />
        <div class="product-info">
          <h3>${title}</h3>
          <h4>${price}</h4>
          <h5>${location}</h5>
          <span>${phoneNumber}</span>
          <span>${contactName}</span>
          <p>${agency}</p>
          <p>
           ${description}
          </p>
          <button class="btn">Rent Space</button>
        </div>
      </div>`;
};

const start = async () => {
  const data = await fetchData();
  displayProperties(data);
};

start();