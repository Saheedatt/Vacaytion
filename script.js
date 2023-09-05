const apiKey = 'effd046944mshab918ceb096ff70p104d4cjsnd580b285ad6c';

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
      fetchAndDisplayProperties();
    }  
  },
  nav: function (ev) {

    ev.preventDefault();
    let currentPage = ev.target.getAttribute('data-target');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(currentPage).classList.add('active');
    console.log(currentPage);
    history.pushState({}, currentPage, `#${currentPage}`);
    //document.getElementById(currentPage).dispatchEvent(app.show);

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
    const container = document.querySelector('.container');
    if (currentPage === 'home') {
      container.style.backgroundImage = 'url(images/pexels-roberto-nickson-2659629.jpg)';
    }else if (currentPage === 'explore') {
      container.style.backgroundImage = 'url(images/home.jpg)'; 
    } else {
      container.style.backgroundImage = 'none';
    }
  },
};

async function fetchPropertyListings() {
    try {
      const response = await fetch('https://bayut.p.rapidapi.com/properties/list', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
        },
        params: {
          purpose: 'for-rent',
          hitsPerPage: '25',
          page: '0',
          lang: 'en',
          sort: 'city-level-score',
          rentFrequency: 'monthly',
        },
      });
  
      if (!response.ok) {
        console.error('Error fetching property listings. Status code:', response.status);
        throw new Error('Failed to fetch property listings.');
      }
  
      const data = await response.json();
      console.log('Response Data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching property listings:', error);
      throw error;
    }
  }
  


async function fetchAndDisplayProperties() {
  try {
    const propertyListings = await fetchPropertyListings();
    const exploreContainer = document.getElementById('explore');

    for (const property of propertyListings) {
      const propertyContainer = document.createElement('div'); 
      propertyContainer.classList.add('property-item'); 

      const title = document.createElement('h2');
      title.textContent = property.title;

      const price = document.createElement('p');
      price.textContent = `Price: ${property.price}`;

      const location = document.createElement('p');
      location.textContent = `Location: ${property.location}`;

      // Check if photo URLs are available and create image elements
      if (property.photos && property.photos.length > 0) {
        const photoContainer = document.createElement('div');
        photoContainer.classList.add('photo-container');

        property.photos.forEach(photoURL => {
          const image = document.createElement('img');
          image.src = photoURL;
          image.alt = property.title;

          
          photoContainer.appendChild(image);
        });

       
        propertyContainer.appendChild(photoContainer);
      }

      
      exploreContainer.appendChild(propertyContainer);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}




document.addEventListener('DOMContentLoaded', app.init);
