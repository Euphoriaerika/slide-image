document.addEventListener('DOMContentLoaded', function() {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        initializeSlider(data);
      })
      .catch(error => console.error('Error loading data:', error));
  
    function initializeSlider(data) {
      const sliderList = document.querySelector('.slider .list');
      const thumbnailList = document.querySelector('.slider .thumbnail');
  
      data.forEach((item, index) => {
        const slideItem = document.createElement('div');
        slideItem.classList.add('item');
        if (index === 0) slideItem.classList.add('active');
        slideItem.innerHTML = `
          <img src="${item.imageSrc}" alt="${item.title}" />
          <div class="content">
            <p>${item.category}</p>
            <h2 class="title">${item.title}</h2>
            <p class="description">${item.description}</p>
          </div>
        `;
        sliderList.appendChild(slideItem);
  
        const thumbnailItem = document.createElement('div');
        thumbnailItem.classList.add('item');
        if (index === 0) thumbnailItem.classList.add('active');
        thumbnailItem.innerHTML = `
          <img src="${item.imageSrc}" />
          <div class="content">${item.title}</div>
        `;
        thumbnailList.appendChild(thumbnailItem);
      });
  
      const items = document.querySelectorAll(".slider .list .item");
      const next = document.getElementById("next");
      const prev = document.getElementById("prev");
      const thumbnails = document.querySelectorAll(".thumbnail .item");
  
      let itemActive = 0;
  
      next.onclick = function () {
        itemActive = (itemActive + 1) % data.length;
        showSlider();
      };
  
      prev.onclick = function () {
        itemActive = (itemActive + data.length - 1) % data.length;
        showSlider();
      };
  
      thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
          itemActive = index;
          showSlider();
        });
      });
  
      let refreshInterval = setInterval(() => {
        next.click();
      }, 8 * 1000);
  
      function showSlider() {
        let itemActiveOld = document.querySelector(".slider .list .item.active");
        let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
        itemActiveOld.classList.remove("active");
        thumbnailActiveOld.classList.remove("active");
  
        items[itemActive].classList.add("active");
        thumbnails[itemActive].classList.add("active");
  
        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
          next.click();
        }, 8 * 1000);
      }
    }
  });
  