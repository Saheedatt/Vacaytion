const apiKey = 'effd046944mshab918ceb096ff70p104d4cjsnd580b285ad6c';
const apiUrl = 'https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4';
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
document.addEventListener('DOMContentLoaded', app.init);

/*const apiKey = 'effd046944mshab918ceb096ff70p104d4cjsnd580b285ad6c';
const apiUrl = 'https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4';


// Function to fetch property listings from the API
async function fetchPropertyListings() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
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

// Function to display property cards
function displayPropertyCards(propertyListings) {
  const cardContainer = document.getElementById('card-container');
  const cardsPerRow = 3; // Number of cards per row

  for (let i = 0; i < propertyListings.length; i++) {
    const property = propertyListings[i];

    // Create a new card div
    const card = document.createElement('div');
    card.classList.add('card');

    // Create and set the image element
    const image = document.createElement('img');
    image.src = property.imageUrl; // Replace with the property image URL
    image.alt = property.title;

    // Create and set the title element
    const title = document.createElement('h2');
    title.textContent = property.title;

    // Create and set the price element
    const price = document.createElement('p');
    price.textContent = `Price: ${property.price}`;

    // Create and set the location element
    const location = document.createElement('p');
    location.textContent = `Location: ${property.location}`;

    // Append image, title, price, and location to the card
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(location);

    // Append the card to the card container
    cardContainer.appendChild(card);

    // Check if we need to start a new row
    if ((i + 1) % cardsPerRow === 0) {
      // Add a row break div
      const rowBreak = document.createElement('div');
      rowBreak.classList.add('row-break');
      cardContainer.appendChild(rowBreak);
    }
  }
}

// Main function to fetch and display property listings
async function fetchAndDisplayProperties() {
  try {
    const propertyListings = await fetchPropertyListings();

    // Display property cards
    displayPropertyCards(propertyListings);
  } catch (error) {
    console.error('Error:', error);
  }
}

document.addEventListener('DOMContentLoaded', app.init);
*/
