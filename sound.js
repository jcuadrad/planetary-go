/* Global AFRAME, THREE*/

AFRAME.registerComponent('listen', {
  init: function () {
    var element = this.el;
    
    element.addEventListener('click', function() {
      element.emit('go', {}, true);
      console.log('Emitting!')
    });
  }
});

AFRAME.registerComponent('join-sound', {
  init: function () {}
});