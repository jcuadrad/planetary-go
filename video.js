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

console.log(video);

video.addEventListener('canplay', (e) => {
  clearInterval(dots);
  playButton.innerHTML = 'ARE YOU READY?';
  playButton.addEventListener('click', () => {
    video.play();
    firstScreen.remove();
  });
})