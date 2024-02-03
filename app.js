let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let thumbnail = document.querySelectorAll(".thumbnail .item");

//config param
let countItem = items.length;
let itemActive = 0;

//event next click
next.onclick = function () {
  itemActive = (itemActive + 1) % countItem;
  showSlider();
};

//event prev click
prev.onclick = function () {
  itemActive = (itemActive + countItem - 1) % countItem;
  console.log(itemActive);
  showSlider();
};

//event click thumbnail
thumbnail.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});

// auto run slider

let refreshInterval = setInterval(() =>{
    next.click();
}, 3000);

function showSlider() {
  //remove item active old
  let itemActiveOld = document.querySelector(".slider .list .item.active");
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
  itemActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");

  //active new item
  items[itemActive].classList.add("active");
  thumbnail[itemActive].classList.add("active");

  //clear auto time run slider
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 3000);
}
