let chng = document.getElementById("change-lang");
let titles = document.querySelectorAll(".title");
let descriptions = document.querySelectorAll(".description");
let menuel = document.querySelectorAll(".menuel");

// config param
let currentLanguage = "english";

// data
var data = {
  english: {
    menuel: ["Portfolio", "About me", "Contact me"],
    titles: ["Slider", "Eatpy", "Flexgym"],
    descriptions: [
      "A dynamic image slider website created using HTML, CSS, and JavaScript, offering seamless navigation through fullscreen images or manual control via image cards. The straightforward setup facilitates easy customization with your own images.",
      "This food planning website provides personalized meal recommendations and dietary guidance, helping users make healthier choices based on their preferences and health goals.",
      "The gym website is a one-stop destination for fitness, offering tailored workout plans, nutrition advice, and a supportive community for individuals striving to achieve their health goals.",
    ],
  },
  ukraine: {
    menuel: ["Портфоліо", "Про мене", "Зв'язок"],
    titles: ["Слайдер", "Етапі", "Флекс"],
    descriptions: [
      "Веб-сайт із динамічним слайдером зображень, створений за допомогою HTML, CSS та JavaScript, що пропонує безперервну навігацію через повноекранні зображення або керування за допомогою картинок вручну. Проста установка сприяє легкій настроюваності із використанням ваших власних зображень.",
      "Цей веб-сайт для планування харчування надає персоналізовані рекомендації щодо прийому їжі та діетичні поради, допомагаючи користувачам здійснювати здорові вибори на основі їхніх вподобань та цілей здоров'я.",
      "Веб-сайт фітнес-залу - це єдине місце для здоров'я та фітнесу, яке пропонує індивідуальні плани тренувань, поради з харчування та підтримку спільноти для осіб, які прагнуть досягти своїх здоров'ячних цілей.",
    ],
  },
};

// event change lang page
chng.onclick = function () {
  currentLanguage = currentLanguage === "english" ? "ukraine" : "english";
  changeContent(currentLanguage);
};

function changeContent(language) {
  // update element whith class "title"
  Array.from(titles).forEach((title, index) => {
    title.innerText = data[language].titles[index];
  });

  // update element whith class "description"
  Array.from(descriptions).forEach((description, index) => {
    description.innerText = data[language].descriptions[index];
  });

  // update element whith class "menuel"
  Array.from(menuel).forEach((menuel, index) => {
    menuel.innerText = data[language].menuel[index];
  });
}
