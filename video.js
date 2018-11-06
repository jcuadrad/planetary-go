/* Opening Screen Controller */

// Loading Dots animation
var dots = window.setInterval( function() {
  var wait = document.getElementById("dots");
  if ( wait.innerHTML.length > 3 ) 
      wait.innerHTML = "";
  else 
      wait.innerHTML += ".";
  }, 100);

// Detect opening video events.
let video = document.getElementById('fullscreen-bg__video');
let playButton = document.getElementsByClassName('button')[0];
let firstScreen = document.getElementById('white-background');

let checkVideo = setInterval(() => {
  if (video.readyState >= video.HAVE_FUTURE_DATA) {
    console.log('Video Can Be Played Now!');
    clearInterval(dots);
    playButton.innerHTML = 'ARE YOU READY?';
    playButton.addEventListener('click', () => {
      video.play();
      firstScreen.remove();
    });

    clearInterval(checkVideo);
  } else {
    console.log('Video Ready State: ' + video.readyState);
  }
}, 1500);

console.log(video);

video.addEventListener('canplay', (e) => {
  console.log('Video Can Be Played Now!');
  clearInterval(dots);
  playButton.innerHTML = 'ARE YOU READY?';
  playButton.addEventListener('click', () => {
    video.play();
    firstScreen.remove();
  });
})