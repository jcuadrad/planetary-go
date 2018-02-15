/* global AFRAME, THREE*/

AFRAME.registerComponent('listen', {
  init: function () {
    var element = this.el;
    
    element.addEventListener('click', function() {
      element.emit('go', {}, true);
      console.log('Emitting!')
    });
  }
});

AFRAME.registerComponent('sound-ready', {
  init: function () {
    var element = this.el;
    
    if (element.components.sound.hasLoaded) {
      console.log('Sound is ready bro!');
    }
  }
});