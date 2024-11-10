const url =
'https://bayut-com1.p.rapidapi.com/properties/list?name=Abu%20Dhabi&purpose=for-rent&hitsPerPage=30&page=0&sort=city-level-score';
  //"https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4";

const propertyDOM = document.querySelector(".property-center");

const fetchData = async () => {
  propertyDOM.innerHTML = '<div class="loading"></div>';

  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': 'effd046944mshab918ceb096ff70p104d4cjsnd580b285ad6c',
      'X-RapidAPI-Host': 'bayut-com1.p.rapidapi.com'
     // "X-RapidAPI-Key": "effd046944mshab918ceb096ff70p104d4cjsnd580b285ad6c",
      //"X-RapidAPI-Host": "bayut.p.rapidapi.com",
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
};
const displayProperties = (properties) => {
  const propertyList = properties
    .map((property) => {
      const imageUrl = property.coverPhoto ? property.coverPhoto.url : "";
      return `
        <div class ="property-modal">
        <div class="property" id=${property.id}>
          <button class="close-modal"><i class="fa-solid fa-xmark"></i></button>
          <img src="${imageUrl}" alt="${property.title}" class="property-image">
          <h3>${property.title}</h3>
          <div class="details">
          <h2>${property.title}</h2>
          <p class="price">Price: <span>${property.price}</span></p>
          <p class="rooms">Rooms: <span>${property.rooms}</span></p>
          <p class="baths">Baths: <span>${property.baths}</span></p>
          <p class="location">Location: <span>${property.area}</span></p>
          <p class=description">Description: <span>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit repudiandae commodi, omnis optio sapiente mollitia dolores, magni minima ratione, qui quisquam.</span></p>
          </div>
        </div>
        </div>`;
    })
    .join("");
  propertyDOM.innerHTML = `<div class="property-container">${propertyList}</div>`;

  // MODAL FUNCTIONALITY
  const propertiesModal = propertyDOM.querySelectorAll(".property-modal");
  propertiesModal.forEach((property) => {
    let closeBtn = property.querySelector(".close-modal");
    property.addEventListener("mousedown", (e) => {
      if (closeBtn.contains(e.target)) {
        property.classList.remove("active");
      } else {
        property.classList.add("active");
      }
    });
  });
};
const start = async () => {
  const data = await fetchData();
  console.log(data);
  displayProperties(data);
};

start();

// SIDEBAR FUNCTIONALITY
const sidebarToggle = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelector(".close-sidebar");
const sidebar = document.querySelector("aside");
const listElements = document.querySelectorAll("aside li");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.add("show-sidebar");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show-sidebar");
});

listElements.forEach((element) => {
  element.addEventListener("click", () => {
    sidebar.classList.remove("show-sidebar");
  });
});

// FORM FUNCTIONALITY
const listPropertyButton = document.querySelector('.buttons .list:nth-child(2)');
const popupForm = document.getElementById('property-form');
const closeFormButton = document.querySelector('.close-form');

listPropertyButton.addEventListener('click', () => {
    popupForm.style.display = 'flex';
});

closeFormButton.addEventListener('click', () => {
    popupForm.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === popupForm) {
        popupForm.style.display = 'none';
    }
});