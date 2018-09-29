/* Opening Screen Controller */

var colors = ["#C7242B", "#35B725", "#0B32BD", "#DECA38"]

function colorOptions (array) {
    var final = array[Math.floor(Math.random()*array.length)];
  return final;
} 

function changeColor() {
  var background = document.getElementById("wait");
    background.style.backgroundColor = colorOptions(colors);
}

var backChange = setInterval(changeColor, 700) 