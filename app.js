document.addEventListener("DOMContentLoaded", function () {
  let currentLanguage = "en"; // За замовчуванням англійська мова
  let activeSlideIndex = 0; // Індекс активного слайда

  // Функція зміни мови
  function downloadData(language) {
    fetch(`./data/data-${language}.json`)
      .then((response) => response.json())
      .then((data) => {
        initializeSlider(data);
      })
      .catch((error) => console.error("Error loading data:", error));
  }

  // Функція ініціалізації слайдера
  function initializeSlider(data) {
    const sliderList = document.querySelector(".slider .list");
    const thumbnailList = document.querySelector(".slider .thumbnail");

    // Очищення списків слайдів та мініатюр
    sliderList.innerHTML = "";
    thumbnailList.innerHTML = "";

    data.forEach((item, index) => {
      const slideItem = document.createElement("div");
      slideItem.classList.add("item");
      if (index === activeSlideIndex) slideItem.classList.add("active");
      slideItem.innerHTML = `
            <img src="${item.imageSrc}" alt="${item.title}" />
            <div class="content">
              <p>${item.category}</p>
              <h2 class="title">${item.title}</h2>
              <p class="description">${item.description}</p>
            </div>
          `;
      sliderList.appendChild(slideItem);

      const thumbnailItem = document.createElement("div");
      thumbnailItem.classList.add("item");
      if (index === activeSlideIndex) thumbnailItem.classList.add("active");
      thumbnailItem.innerHTML = `
            <img src="${item.imageSrc}" />
            <div class="content">${item.title}</div>
          `;
      thumbnailList.appendChild(thumbnailItem);
    });

    // Оновлення подій кліків на наступний та попередній слайди
    const items = document.querySelectorAll(".slider .list .item");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    const thumbnails = document.querySelectorAll(".thumbnail .item");

    next.onclick = function () {
      activeSlideIndex = (activeSlideIndex + 1) % data.length;
      showSlider();
    };

    prev.onclick = function () {
      activeSlideIndex = (activeSlideIndex + data.length - 1) % data.length;
      showSlider();
    };

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        activeSlideIndex = index;
        showSlider();
      });
    });

    let refreshInterval = setInterval(() => {
      next.click();
    }, 3000);

    // Функція показу активного слайда
    function showSlider() {
      // Видалення активного класу зі старого активного слайда
      document
        .querySelector(".slider .list .item.active")
        .classList.remove("active");
      document
        .querySelector(".thumbnail .item.active")
        .classList.remove("active");

      // Додавання активного класу до нового активного слайда
      items[activeSlideIndex].classList.add("active");
      thumbnails[activeSlideIndex].classList.add("active");
      //clear auto time run slider
      clearInterval(refreshInterval);
      refreshInterval = setInterval(() => {
        next.click();
      }, 6000);
    }
  }

  // Ініціалізація слайдера при завантаженні сторінки
  downloadData(currentLanguage);

  // Обробник події зміни мови
  let chng = document.getElementById("change-lang");
  chng.onclick = function () {
    currentLanguage = currentLanguage === "en" ? "uk" : "en";
    downloadData(currentLanguage);
  };
});
