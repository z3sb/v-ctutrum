const landing = document.querySelector('.landing-page');

setInterval(() => {
  landing.style.backgroundImage = `url('../imgs/0${Math.floor(Math.random() * 5) + 1}.jpg')`;
}, 10000);