async function fetchProperties() {
  const url =
    'https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4';

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'effd046944mshab918ceb096ff70p104d4cjsnd580b285ad6c',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.hits;
  } catch (error) {
    console.error(error);
    return [];
  }
}
function displayProperties(properties) {
  const propertiesHtml = properties.map((property) => {
    const imageUrl = property.coverPhoto ? property.coverPhoto.url : '';
    return `
      <div class="property">
        <img src="${imageUrl}" alt="${property.title}" width="300" height="200">
        <h3>${property.title}</h3>
        <p>ID: ${property.id}</p>
        <p>Price: ${property.price}</p>
        <p>Rooms: ${property.rooms}</p>
        <p>Baths: ${property.baths}</p>
        <p>Location: ${property.area}</p>
      </div>
    `;
  });

  const explorePage = document.getElementById('explore');
  explorePage.innerHTML = propertiesHtml.join('');
}

function init() {
  fetchProperties()
    .then((properties) => {
      displayProperties(properties);
    })
    .catch((error) => {
      console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', init);