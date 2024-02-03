let chng = document.getElementById("change-lang");
let title = document.querySelector(".title");
let description = document.querySelector(".description");

//config param
let currentLanguage = "english";

//data
var data = {
  english: {
    title: "Slider",
    description:
      "A dynamic image slider website created using HTML, CSS, and JavaScript, offering seamless navigation through fullscreen images or manual control via image cards. The straightforward setup facilitates easy customization with your own images.",
  },
  ukraine: {
    title: "Слайдер",
    description:
      "Веб-сайт із динамічним слайдером зображень, створений за допомогою HTML, CSS та JavaScript, що пропонує безперервну навігацію через повноекранні зображення або керування за допомогою картинок вручну. Проста установка сприяє легкій настроюваності із використанням ваших власних зображень.",
  },
};

chng.onclick = function () {
  currentLanguage = currentLanguage === "english" ? "ukraine" : "english";
  changeContent(currentLanguage);
};

function changeContent(language) {
  title.innerText = data[language].title;
  description.innerText = data[language].description;
}
