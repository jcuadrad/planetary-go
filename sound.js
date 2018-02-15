/* global AFRAME, THREE, Howl*/

var backingTrack = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2014%20~%20Backing%20Tracks.mp3?1518505535158'],
      preload: true,
      onload: function() {
        console.log('Finished!');
      }
  });

var vocals = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2001%20~%20Lead%20Vocal.mp3?1518505552897'],
      preload: true,
      onload: function() {
        console.log('Finished!');
      }
  });

var backingVocals = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2001%20~%20Lead%20Vocal.mp3?1518505552897'],
      preload: true,
      onload: function() {
        console.log('Finished!');
      }
  });

var drums = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2001%20~%20Lead%20Vocal.mp3?1518505552897'],
      preload: true,
      onload: function() {
        console.log('Finished!');
      }
  });

AFRAME.registerComponent('listen', {
  init: function () {
    var element = this.el;
    
    element.addEventListener('mouseenter', function() {
      backingTrack.play();
      vocals.play();
    });
  }
});

AFRAME.registerComponent('volume-backingTrack', {
  init: function () {
    var element = this.el;
    
    element.addEventListener('mouseenter', function() {
      backingTrack.mute(true);
    });
    
    element.addEventListener('mouseleave', function() {
      backingTrack.mute(false);
    });
  }
});

AFRAME.registerComponent('volume-vocals', {
  init: function () {
    var element = this.el;
    
    element.addEventListener('mouseenter', function() {
      vocals.mute(true);
    });
    
    element.addEventListener('mouseleave', function() {
      vocals.mute(false);
    });
  }
});