/* global AFRAME, THREE, Howl, backChange */

/* SOUND LOADING HELPERS */

// Counter
var loadedSoundFiles = 0;

// Initialize sound files
var backingTrack = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2014%20~%20Backing%20Tracks.mp3?1518505535158'],
      preload: true,
      onload: function() {
        loadedSoundFiles++
        console.log('Finished Backing Track!', loadedSoundFiles);
      }
  });

var vocals = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2001%20~%20Lead%20Vocal.mp3?1518505552897'],
      preload: true,
      onload: function() {
        loadedSoundFiles++
        console.log('Finished Vocals!', loadedSoundFiles);
      }
  });

var backingVocals = new Howl({
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2002%20~%20Backing%20Vocals.mp3?1518677841612'],
      preload: true,
      onload: function() {
        loadedSoundFiles++
        console.log('Finished Backing Vocals!', loadedSoundFiles);
      }
  });

var drums = new Howl({       
      src: ['https://cdn.glitch.com/d33f835c-f9e3-4d9b-a2fc-e8780d036b67%2FPlanetary%20(Go!)%20~%20Stems%20~%2003%20~%20Drums.mp3?1518677850598'],
      preload: true,
      onload: function() {
        loadedSoundFiles++
        console.log('Finished Drums!', loadedSoundFiles);
      }
  });

// Loading Dots animation
var dots = window.setInterval( function() {
    var wait = document.getElementById("dots");
    if ( wait.innerHTML.length > 3 ) 
        wait.innerHTML = "";
    else 
        wait.innerHTML += ".";
    }, 100);

// Check for when assets are ready
var assetsReady = () => {
  var assets = document.querySelector('a-assets');
  if (assets) {
    console.log('Assets Ready', assets);
    assets.addEventListener('loaded', function () {
    console.log("OK LOADED");
    });
  } else {
    console.log('Assets Not Ready');
    return;
  }
}

var soundReady = () => {
  if (loadedSoundFiles === 4) {
    var waitScreen = document.getElementById('wait');
    console.log('Sound Is Ready', loadedSoundFiles);
    clearInterval(dots);
    clearInterval(checkSound);
    waitScreen.innerHTML = `
      <h1 class="sliding-middle-out clickable">LETS GO!<h1>
    `
    waitScreen.addEventListener('click', function() {
      var startScreen = document.getElementById('start-screen');
      var video = document.getElementById("title");
      var html = `
        <a-plane color="#ffffff" scale="0.071 0.071 0.705" material="shader:flat" position="0 1.05 -2.5" geometry="height:9;width:16" class="UIbutton" id="listen" hoverable
                   event-set__rescol="_event: click; color: #C6252A" listen>
                   <a-text value="Let's Go!" color="#C6252A" height="50"  width="80" position="-7 0 0"></a-text>
        </a-plane>
      `;
      startScreen.insertAdjacentHTML('beforeend', html);
      waitScreen.remove();
      clearInterval(backChange);
      video.play();
    });
    /* var button = document.createElement('p')
    button.innerHTML = 'Lets GO!'
    waitScreen.appendChild(button);*/
  } else {
    console.log('Sound Not Ready', loadedSoundFiles);
    return;
  }
}

var execute = () => {
  soundReady();
  assetsReady();
};

var checkSound = setInterval(execute, 2000);

// A-FRAME COMPONENTS //

AFRAME.registerComponent('listen', {
  init: function () {
    var element = this.el;
    var startScreen = document.getElementById('start-screen');
    var html = `
    <a-animation id="fade" attribute="scale" to="0 0 0" dur="4000"></a-animation>
    `

    this.buttonClick = () => {
      startScreen.insertAdjacentHTML('beforeend', html);
      startScreen.addEventListener('animationend', function() {
        console.log('Animation Finished!')
        startScreen.removeEventListener('animationend', function() {
          console.log('Removing Animation Listener!');
        });
      });

      var startMusic = setTimeout(this.playMusic, 4000);
      element.removeEventListener('click', this.buttonClick);
      console.log('Removed event listener.')
    }
    // console.log('Element of listen: ', this.playMusic());

    var add = () => {
      console.log('Adding event listener.')
      element.addEventListener('click', this.buttonClick);
    }
    var addStart = setTimeout(add, 3000);
  },
  playMusic: () => {
    console.log('playing!');
    // clearTimeout(addStart);
    // clearTimeout(startMusic);
    backingTrack.play();
    vocals.play();
    drums.play();
    backingVocals.play();
  }
});

AFRAME.registerComponent('volume-backing-track', {
  init: function () {
    var element = this.el;
    var obj = element.getObject3D('mesh');
    var light = obj.el.children[0];
    
    element.addEventListener('raycaster-intersected', function() {
      // Mute
      backingTrack.mute(true);
      
      // Modify the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        emissive: '#ff0000',
        flatShading: THREE.FlatShading
      })
      
      // Turn off Light
      light.setAttribute('intensity', '0.1');
    });
    
    element.addEventListener('raycaster-intersected-cleared', function() {
      // Mute
      backingTrack.mute(false);
      
      // Back to the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        color: '#ff0000',
        flatShading: THREE.FlatShading
      })
      
      // Turn on Light
      light.setAttribute('intensity', '0.4');
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
        emissive: '#004eff',
        flatShading: THREE.FlatShading
      })
      
      // Turn off Light
      light.setAttribute('intensity', '0.1');
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
      light.setAttribute('intensity', '0.4');
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
        emissive: '#ffea00',
        flatShading: THREE.FlatShading
      })
      
      // Turn off Light
      light.setAttribute('intensity', '0.1');
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
      light.setAttribute('intensity', '0.4');
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
        emissive: '#72ff00',
        flatShading: THREE.FlatShading
      })
      
      // Turn off Light
      light.setAttribute('intensity', '0.1');
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
      light.setAttribute('intensity', '0.4');
    });
  }
});