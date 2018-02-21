/* global AFRAME, THREE, Howl*/

var backingTrack = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2014%20~%20Backing%20Tracks.mp3?1518505535158'],
      preload: true,
      onload: function() {
        console.log('Finished Backing Track!');
      }
  });

var vocals = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2001%20~%20Lead%20Vocal.mp3?1518505552897'],
      preload: true,
      onload: function() {
        console.log('Finished Vocals!');
      }
  });

var backingVocals = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2002%20~%20Backing%20Vocals.mp3?1518677841612'],
      preload: true,
      onload: function() {
        console.log('Finished Backing Vocals!');
      }
  });

var drums = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2003%20~%20Drums.mp3?1518677850598'],
      preload: true,
      onload: function() {
        console.log('Finished Drums!');
      }
  });

AFRAME.registerComponent('listen', {
  init: function () {
    var element = this.el;
    
    element.addEventListener('hover-start', function() {
      backingTrack.play();
      vocals.play();
      drums.play();
      backingVocals.play();
      element.parentNode.removeChild(element);
    });
  }
});

AFRAME.registerComponent('volume-backing-track', {
  init: function () {
    var element = this.el;
    
    element.addEventListener('hover-start', function() {
      backingTrack.mute(true);
    });
    
    element.addEventListener('hover-end', function() {
      backingTrack.mute(false);
    });
  }
});

AFRAME.registerComponent('volume-vocals', {
  init: function () {
    var element = this.el;
    
    element.addEventListener('hover-start', function() {
      vocals.mute(true);
    });
    
    element.addEventListener('hover-end', function() {
      vocals.mute(false);
    });
  }
});

AFRAME.registerComponent('volume-drums', {
  init: function () {
    var element = this.el;
    
    element.addEventListener('hover-start', function() {
      drums.mute(true);
    });
    
    element.addEventListener('hover-end', function() {
      drums.mute(false);
    });
  }
});

AFRAME.registerComponent('volume-backing-vocals', {
  init: function () {
    var element = this.el;
    
    element.addEventListener('hover-start', function() {
      backingVocals.mute(true);
    });
    
    element.addEventListener('hover-end', function() {
      backingVocals.mute(false);
    });
  }
});