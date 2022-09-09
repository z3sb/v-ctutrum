const settings = document.getElementById('settings'),
      settingsBox = document.querySelector('.settings-box'),
      colors  = document.querySelectorAll('.option span'),
      bgButtons = document.querySelectorAll('.bg button');

if(localStorage.getItem('color')){
  document.documentElement.style.setProperty('--main-color', localStorage.getItem('color'))
  colors.forEach(ele => {
    ele.classList.remove('active');
    if(ele.dataset.color == localStorage.getItem('color')){
      ele.classList.add('active')
    }
  })
}
let randomBackgrounds = true;
let backgroundInterval;
let localBackground = localStorage.getItem('randomBackgrounds');
if(localBackground == false){
  randomizeImgs();
} else if(localBackground == null){
  randomBackgrounds = true;
  randomizeImgs();
}
if(localBackground === 'false'){
  document.querySelector('.option button[data-run="1"]').classList.remove("active");
  document.querySelector('.option button[data-run="0"]').classList.add("active");
}
// Start Settings Box
settings.addEventListener('click', () => {
  settingsBox.classList.toggle('show');
  settings.classList.toggle('show')
})
// colors
colors.forEach((sp) => {
  sp.addEventListener('click', () => {
    removeActive(colors);
    sp.classList.add('active');
    document.querySelector(':root').style.setProperty('--main-color', sp.getAttribute('data-color'));
    localStorage.setItem('color', sp.getAttribute('data-color'));
  });
});
// buttons
bgButtons.forEach((but) => {
  but.addEventListener('click', () => {
    removeActive(bgButtons);
    but.classList.add('active');
    randomBackgrounds = Boolean(Number(but.getAttribute('data-run')));
    randomizeImgs();
    localStorage.setItem('randomBackgrounds', randomBackgrounds)
  });
});
function removeActive(arr){
  arr.forEach((e) => {
    e.classList.remove('active');
  })
}
// End Settings Box

// Start Landing 
const landing = document.querySelector('.landing-page');
function randomizeImgs(){
  if(randomBackgrounds){
    backgroundInterval = setInterval(() => {
      landing.style.backgroundImage = `url('../imgs/0${Math.floor(Math.random() * 5) + 1}.jpg')`;
    }, 1000);
  } else{
    clearInterval(backgroundInterval)
  }
}
// End Landing 