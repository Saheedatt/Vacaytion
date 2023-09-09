const url =
  "https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=5&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4";

const propertyDOM = document.querySelector(".property-center");

const fetchData = async () => {
  propertyDOM.innerHTML = '<div class="loading"></div>';

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "effd046944mshab918ceb096ff70p104d4cjsnd580b285ad6c",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
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
        <div class="property" id=${property.id}>
          <img src="${imageUrl}" alt="${property.title}" class="property-image">
          <h3>${property.title}</h3>
          <div class="details">
          <h2>${property.title}</h2>
          <p class="price">Price: <span>${property.price}</span></p>
          <p class="rooms">Rooms: <span>${property.rooms}</span></p>
          <p class="baths">Baths: <span>${property.baths}</span></p>
          <p class="location">Location: <span>${property.area}</span></p>
          <p class="description">Description: <span>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit repudiandae commodi, omnis optio sapiente mollitia dolores, magni minima ratione, qui quisquam. Exercitationem quam, nisi nemo voluptates voluptate in aut culpa enim mollitia dolor sequi ducimus excepturi maxime ipsam sapiente porro fugiat, quis necessitatibus? Commodi temporibus quia voluptatibus ad repudiandae nihil ut in. Culpa fugit nesciunt enim dolor cum voluptate veniam ipsum accusantium tempora! Perspiciatis voluptatibus cupiditate ullam, accusantium atque ad."</span></p>
          </div>
        </div>`;
    })
    .join("");
  propertyDOM.innerHTML = `<div class="property-container">${propertyList}</div>`;
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
