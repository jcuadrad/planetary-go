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
    var obj = element.getObject3D('mesh');
    var light = obj.el.children[0];
    
    element.addEventListener('hover-start', function() {
      // Mute
      backingTrack.mute(true);
      
      // Modify the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        emissive: '#ff0000',
        flatShading: THREE.FlatShading
      })
      
      // Turn off Light
      light.setAttribute('visible', false);
    });
    
    element.addEventListener('hover-end', function() {
      // Mute
      backingTrack.mute(false);
      
      // Back to the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        color: '#ff0000',
        flatShading: THREE.FlatShading
      })
      
      // Turn on Light
      light.setAttribute('visible', true);
    });
  }
});

AFRAME.registerComponent('volume-vocals', {
  init: function () {
    var element = this.el;
    var obj = element.getObject3D('mesh');
    var light = obj.el.children[0];
    
    element.addEventListener('hover-start', function() {
      // Mute
      vocals.mute(true);
      
      // Modify the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        color: 'grey',
        flatShading: THREE.FlatShading
      })
      
      // Turn off Light
      light.setAttribute('visible', false);
    });
    
    element.addEventListener('hover-end', function() {
      // Mute
      vocals.mute(false);
      
      // Back to the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        color: '#004eff',
        flatShading: THREE.FlatShading
      })
      
      // Turn on Light
      light.setAttribute('visible', true);
    });
  }
});

AFRAME.registerComponent('volume-drums', {
  init: function () {
    var element = this.el;
    var obj = element.getObject3D('mesh');
    var light = obj.el.children[0];
    
    element.addEventListener('hover-start', function() {
      // Mute
      drums.mute(true);
      
      // Modify the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        color: 'grey',
        flatShading: THREE.FlatShading
      })
      
      // Turn off Light
      light.setAttribute('visible', false);
    });
    
    element.addEventListener('hover-end', function() {
      // Mute
      drums.mute(false);
      
      // Back to the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        color: '#ffea00',
        flatShading: THREE.FlatShading
      })
      
      // Turn on Light
      light.setAttribute('visible', true);
    });
  }
});

AFRAME.registerComponent('volume-backing-vocals', {
  init: function () {
    var element = this.el;    
    var obj = element.getObject3D('mesh');
    var light = obj.el.children[0];
    
    element.addEventListener('hover-start', function() {
      // Mute
      backingVocals.mute(true);
      
      // Modify the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        color: 'grey',
        flatShading: THREE.FlatShading
      })
      
      // Turn off Light
      light.setAttribute('visible', false);
    });
    
    element.addEventListener('hover-end', function() {
      // Mute
      backingVocals.mute(false);
      
      // Back to the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        color: '#72ff00',
        flatShading: THREE.FlatShading
      })
      
      // Turn on Light
      light.setAttribute('visible', true);
    });
  }
});