const app = {
  pages: [],
  init: function () {
    app.pages = document.querySelectorAll('.page');
    app.pages.forEach((pg) => {
      pg.addEventListener('show', app.pageShown);
    });
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', app.nav);
    });
    history.replaceState({}, 'Home', '#home');
    window.addEventListener('popstate', app.poppin);
    app.useBackgroundImage('home');

    const currentPage = location.hash.replace('#', '');
    if (currentPage === 'explore') {
      //displayProperties(properties)
    }
  },
  nav: function (ev) {
    ev.preventDefault();
    let currentPage = ev.target.getAttribute('data-target');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(currentPage).classList.add('active');
    console.log(currentPage);
    history.pushState({}, currentPage, `#${currentPage}`);
    app.useBackgroundImage(currentPage);
  },
  poppin: function (ev) {
    console.log(location.hash, 'popstate event');
    let hash = location.hash.replace('#', '');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(hash).classList.add('active');
    console.log(hash);
    document.getElementById(hash).dispatchEvent(app.show);
    app.useBackgroundImage(hash);
  },
  useBackgroundImage: function (currentPage) {
    const container = document.querySelector('main');
    if (currentPage === 'home') {
      container.style.backgroundImage = 'url(images/pexels-roberto-nickson-2659629.jpg)';
    } else if (currentPage === 'explore') {
      container.style.backgroundImage = 'url(images/home.jpg)';
    } else if(currentPage === 'about'){
      container.style.backgroundImage = 'url(images/ambience.jpg)';
    }else {
      container.style.backgroundImage = 'url(images/grainy.jpg)';
    }
  },
};
async function fetchData() {
  const url = 'https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'effd046944mshab918ceb096ff70p104d4cjsnd580b285ad6c',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    displayProperties(result.hits);
  }catch (error) {
    console.error(error);
  }
}
fetchData();

function displayProperties(properties) {
  let propertiesHtml = '';

  for (const property in properties) {
    if (properties.hasOwnProperty(property)) {
      const imageUrl = properties[property].coverPhoto ? properties[property].coverPhoto.url : '';

      propertiesHtml += `
        <div class="property">
        <img src="${imageUrl}" alt="${properties[property].title}" width="300" height="200">
          <h3>${properties[property].title}</h3>
          <p>ID: ${properties[property].id}</p>
          <p>Price: ${properties[property].price}</p>
          <p>Rooms: ${properties[property].rooms}</p>
          <p>Baths: ${properties[property].baths}</p>
          <p>Location: ${properties[property].area}</p>
        </div>
      `;
    }
  }

  const explorePage = document.getElementById('explore');
  explorePage.innerHTML = propertiesHtml;
}
document.addEventListener('DOMContentLoaded', () => {
  app.init();
  fetchData();
});