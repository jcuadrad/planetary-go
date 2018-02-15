/* global AFRAME, THREE, Howl*/

var backing = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2014%20~%20Backing%20Tracks.mp3?1518505535158'],
      preload: true,
      onload: function() {
        console.log('Finished!');
      }
  });

AFRAME.registerComponent('wait', {
  init: function () {
    var element = this.el;
    
    if (backing.state() === 'loaded') {}
    
    //element.addEventListener('click', function() {
     // element.emit('go', {}, true);
     // console.log('Emitting!')
   // });
  }
});

AFRAME.registerComponent('sound-ready', {
  init: function () {
    var element = this.el;
    
    if (element.components.sound.loaded) {
      console.log('Sound is ready bro!');
    }
  },
  
  update: function () {
    var element = this.el;
    
    if (element.components.sound.loaded) {
      console.log('Sound is ready bro!');
    }
  }
});