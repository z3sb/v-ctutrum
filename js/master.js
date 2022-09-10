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


// Select Skills Selector
let ourSkills = document.querySelector('.skills-section')
window.onscroll = function () {

  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight - 200)) {

    let skills = document.querySelectorAll('.skills-section .item .progress span');
    skills.forEach(ele => {
      ele.style.width = ele.dataset.progress
    })

  }

};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

  img.addEventListener('click', (e) => {

    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = 'popup-overlay';

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = 'popup-box';

    if (img.alt !== null) {

      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);

    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = 'close-button';

    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);

  });

});

// Close Popup
document.addEventListener("click", function (e) {

  if (e.target.className == 'close-button') {

    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();

  }

});
