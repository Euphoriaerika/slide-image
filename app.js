document.addEventListener("DOMContentLoaded", () => {
  let currentLanguage = "en"; // English language by default
  let activeSlideIndex = 0; // Index of the active slide
  const swapInterval = 16000; // 10 seconds
  var refreshInterval = setInterval(() => {
    next.click();
  }, swapInterval);

  // Function to update the interval
  const updateInterval = () => {
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      next.click();
    }, swapInterval);
  };

  // Function to change language
  const downloadData = (language) => {
    fetch(`./data/data-${language}.json`)
      .then((response) => response.json())
      .then((data) => {
        initializeSlider(data);
      })
      .catch((error) => console.error("Error loading data:", error));
  };

  // Function to initialize the slider
  const initializeSlider = (data) => {
    const sliderList = document.querySelector(".slider .list");
    const thumbnailList = document.querySelector(".slider .thumbnail");

    // Clear slide and thumbnail lists
    sliderList.innerHTML = "";
    thumbnailList.innerHTML = "";

    // Add slides and thumbnails
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

    // Update click events for next and previous slides
    const items = document.querySelectorAll(".slider .list .item");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    const thumbnails = document.querySelectorAll(".thumbnail .item");

    // When the user clicks on the next button slider move to the next slide
    next.onclick = () => {
      activeSlideIndex = (activeSlideIndex + 1) % data.length;
      showSlider();
    };

    // When the user clicks on the previous button slider move to the previous slide
    prev.onclick = () => {
      activeSlideIndex = (activeSlideIndex + data.length - 1) % data.length;
      showSlider();
    };

    // When the user click on the thumbnail element, move to the corresponding slide
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        activeSlideIndex = index;
        showSlider();
      });
    });

    // Function to show the active slide
    const showSlider = () => {
      // Remove active class from the old active slide
      document
        .querySelector(".slider .list .item.active")
        .classList.remove("active");
      document
        .querySelector(".thumbnail .item.active")
        .classList.remove("active");

      // Add active class to the new active slide
      items[activeSlideIndex].classList.add("active");
      thumbnails[activeSlideIndex].classList.add("active");

      // Update the interval auto-sliding
      updateInterval();
    };
  };

  // Initialize the slider when the page loads
  downloadData(currentLanguage);

  // Event handler for language change
  let changeLangButton = document.getElementById("change-lang");
  changeLangButton.onclick = () => {
    currentLanguage = currentLanguage === "en" ? "uk" : "en";
    downloadData(currentLanguage);
  };
});
