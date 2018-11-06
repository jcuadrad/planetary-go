/* global AFRAME, THREE, Howl, backChange */

/* SOUND LOADING HELPERS */

// Counter
var loadedSoundFiles = 0;

// Initialize sound files
var backingTrack = new Howl({
      src: ['./assets/stems/PLANETARY(GO!)_BACKINGTRACKS_192.mp3'],
      preload: true,
      onload: function() {
        loadedSoundFiles++
        console.log('Finished Backing Track!', loadedSoundFiles);
      }
  });

var vocals = new Howl({
      src: ['./assets/stems/PLANETARY(GO!)_LEADVOCALS_192.mp3'],
      preload: true,
      onload: function() {
        loadedSoundFiles++
        console.log('Finished Vocals!', loadedSoundFiles);
      }
  });

var backingVocals = new Howl({
      src: ['./assets/stems/PLANETARY(GO!)_BACKINGVOCALS_192.mp3'],
      preload: true,
      onload: function() {
        loadedSoundFiles++
        console.log('Finished Backing Vocals!', loadedSoundFiles);
      }
  });

var drums = new Howl({       
      src: ['./assets/stems/PLANETARY(GO!)_DRUMS_192.mp3'],
      preload: true,
      onload: function() {
        loadedSoundFiles++
        console.log('Finished Drums!', loadedSoundFiles);
      }
  });

var bass = new Howl({       
      src: ['./assets/stems/PLANETARY(GO!)_BASS_192.mp3'],
      preload: true,
      onload: function() {
        loadedSoundFiles++
        console.log('Finished Bass!', loadedSoundFiles);
      }
  });

var guitars = new Howl({       
      src: ['./assets/stems/PLANETARY(GO!)_GUITARS_192.mp3'],
      preload: true,
      onload: function() {
        loadedSoundFiles++
        console.log('Finished Guitars!', loadedSoundFiles);
      }
  });

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
  if (loadedSoundFiles === 6) {
    var waitScreen = document.getElementById('wait');
    var loading = document.getElementById('loading');
    console.log('Sound Is Ready', loadedSoundFiles);
    clearInterval(checkSound);
    loading.innerHTML = 'CLICK ANYWHERE ON THE SCREEN TO CONTINUE.';
    // var waitScreenReady = `
    //   <h1 class="sliding-middle-out clickable" class="ready">LETS GO!<h1>
    // `
    // waitScreen.insertAdjacentHTML('afterbegin', waitScreenReady)
    waitScreen.addEventListener('click', function() {
      console.log('Removing...');
      var startScreen = document.getElementById('start-screen');
      var video = document.getElementById("title");
      var html = `
        <a-plane color="#ffffff" scale="0.071 0.071 0.705" material="shader:flat" position="0 1.05 -2.5" geometry="height:9;width:16" class="UIbutton" id="listen" listen>
                   <a-text value="Let's Go!" color="#C6252A" height="50"  width="80" position="-7 0 0"></a-text>
        </a-plane>
      `;
      startScreen.insertAdjacentHTML('beforeend', html);
      waitScreen.remove();
      video.play();
    });
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
    this.startScreen = document.getElementById('start-screen');
    var html = `
    <a-animation id="fade" attribute="scale" to="0 0 0" dur="4000"></a-animation>
    `
    this.checkAnimationEnded = () => {
      console.log('Animation Finished!')
      this.startScreen.parentNode.removeChild(this.startScreen);
      console.log('Removed StartScreen!')
    }

    this.buttonClick = () => {
      this.startScreen.insertAdjacentHTML('beforeend', html);
      this.startScreen.addEventListener('animationend', this.checkAnimationEnded);

      this.startMusic = setTimeout(this.playMusic, 4000);
      element.removeEventListener('click', this.buttonClick);
      console.log('Removed event listener.')
    }

    var add = () => {
      console.log('Adding event listener.')
      element.addEventListener('click', this.buttonClick);
    }

    this.addStart = setTimeout(add, 3000);
  },
  playMusic: () => {
    console.log('playing!');
    clearTimeout(this.addStart);
    clearTimeout(this.startMusic);
    backingTrack.play();
    vocals.play();
    drums.play();
    backingVocals.play();
    guitars.play();
    bass.play();
  }
});

AFRAME.registerComponent('volume-backing-track', {
  init: function () {
    this.element = this.el;
    var obj = this.element.getObject3D('mesh');
    var mat = obj.material;
    var light = obj.el.children[0];
    this.leaveOff = false;
    this.platformDetected = false;
    
    this.element.addEventListener('raycaster-intersected', () => {
      this.leaveOff = false;
      console.log('Hovered and I am ', this.leaveOff ? 'off': 'on')
      // Mute
      backingTrack.mute(true);
      
      // Modify the color of the material
      obj.material = mat;
      
      // Turn off Light
      light.setAttribute('intensity', '0.1');
    });
    
    this.element.addEventListener('raycaster-intersected-cleared', () => {
      if (!this.leaveOff) {
        // Mute
        backingTrack.mute(false);
        
        // Back to the color of the material
        obj.material = new THREE.MeshPhongMaterial({
          color: '#ff0000',
          flatShading: THREE.FlatShading
        })
        
        // Turn on Light
        light.setAttribute('intensity', '0.4');
      }
    });
  },
  tick: function() {
    if (!this.platformDetected) {
      console.log('Platform for Click: ', platform)
      if (platform === 'Desktop') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('mousedown', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      } else if (platform === 'Headset') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('click', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      }
    }
  }
});

AFRAME.registerComponent('volume-vocals', {
  init: function () {
    this.element = this.el;
    var obj = this.element.getObject3D('mesh');
    var mat = obj.material;
    var light = obj.el.children[0];
    this.leaveOff = false;
    this.platformDetected = false;
    
    this.element.addEventListener('raycaster-intersected', () => {
      this.leaveOff = false;
      console.log('Hovered and I am ', this.leaveOff ? 'off': 'on')
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
    
    this.element.addEventListener('raycaster-intersected-cleared', () => {
      if (!this.leaveOff) {
        // Mute
        vocals.mute(false);
        
        // Back to the color of the material
        obj.material = mat;
        
        // Turn on Light
        light.setAttribute('intensity', '0.4');
      }
    });
  },
  tick: function() {
    if (!this.platformDetected) {
      console.log('Platform for Click: ', platform)
      if (platform === 'Desktop') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('mousedown', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      } else if (platform === 'Headset') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('click', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      }
    }
  }
});

AFRAME.registerComponent('volume-drums', {
  init: function () {
    this.element = this.el;
    var obj = this.element.getObject3D('mesh');
    var mat = obj.material;
    var light = obj.el.children[0];
    this.leaveOff = false;
    this.platformDetected = false;
    
    this.element.addEventListener('raycaster-intersected', () => {
      this.leaveOff = false;
      console.log('Hovered and I am ', this.leaveOff ? 'off': 'on')
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
    
    this.element.addEventListener('raycaster-intersected-cleared', () => {
      if (!this.leaveOff) {
        // Mute
        drums.mute(false);
        
        // Back to the color of the material
        obj.material = mat;
        
        // Turn on Light
        light.setAttribute('intensity', '0.4');
      }
    });
  },
  tick: function() {
    if (!this.platformDetected) {
      console.log('Platform for Click: ', platform)
      if (platform === 'Desktop') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('mousedown', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      } else if (platform === 'Headset') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('click', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      }
    }
  }
});

AFRAME.registerComponent('volume-backing-vocals', {
  init: function () {
    this.element = this.el;
    var obj = this.element.getObject3D('mesh');
    var light = obj.el.children[0];
    var mat = obj.material;
    this.leaveOff = false;
    this.platformDetected = false;
    
    this.element.addEventListener('raycaster-intersected', () => {
      this.leaveOff = false;
      console.log('Hovered and I am ', this.leaveOff ? 'off': 'on')
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
    
    this.element.addEventListener('raycaster-intersected-cleared', () => {
      if (!this.leaveOff) {
        // Mute
        backingVocals.mute(false);
        
        // Back to the color of the material
        obj.material = mat;
        
        // Turn on Light
        light.setAttribute('intensity', '0.4');
      }
    });
  },
  tick: function() {
    if (!this.platformDetected) {
      console.log('Platform for Click: ', platform)
      if (platform === 'Desktop') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('mousedown', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      } else if (platform === 'Headset') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('click', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      }
    }
  }
});

AFRAME.registerComponent('volume-bass', {
  init: function () {
    this.element = this.el;
    var obj = this.element.getObject3D('mesh');
    var mat = obj.material;
    var light = obj.el.children[0];
    this.leaveOff = false;
    this.platformDetected = false;
    
    this.element.addEventListener('raycaster-intersected', () => {
      this.leaveOff = false;
      console.log('Hovered and I am ', this.leaveOff ? 'off': 'on')
      // Mute
      bass.mute(true);
      
      // Modify the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        emissive: '#ff0000',
        emissiveIntensity: 0.8,
        flatShading: THREE.FlatShading
      })
      
      // Turn off Light
      light.setAttribute('intensity', '0.1');
    });
    
    this.element.addEventListener('raycaster-intersected-cleared', () => {
      if (!this.leaveOff) {
        // Mute
        bass.mute(false);
        
        // Back to the color of the material
        obj.material = mat;
        
        // Turn on Light
        light.setAttribute('intensity', '0.4');
      }
    });
  },
  tick: function() {
    if (!this.platformDetected) {
      console.log('Platform for Click: ', platform)
      if (platform === 'Desktop') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('mousedown', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      } else if (platform === 'Headset') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('click', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      }
    }
  }
});

AFRAME.registerComponent('volume-guitars', {
  init: function () {
    this.element = this.el;
    var obj = this.element.getObject3D('mesh');
    var light = obj.el.children[0];
    var mat = obj.material;
    this.leaveOff = false;
    this.platformDetected = false;
    
    this.element.addEventListener('raycaster-intersected', () => {
      this.leaveOff = false;
      console.log('Hovered and I am ', this.leaveOff ? 'off': 'on')
      // Mute
      guitars.mute(true);
      
      // Modify the color of the material
      obj.material = new THREE.MeshPhongMaterial({
        emissive: '#72ff00',
        flatShading: THREE.FlatShading
      })
      
      // Turn off Light
      light.setAttribute('intensity', '0.1');
    });
    
    this.element.addEventListener('raycaster-intersected-cleared', () => {
      if (!this.leaveOff) {
        // Mute
        guitars.mute(false);
        
        // Back to the color of the material
        obj.material = mat;
        
        // Turn on Light
        light.setAttribute('intensity', '0.4');
      }
    });
  },
  tick: function() {
    if (!this.platformDetected) {
      console.log('Platform for Click: ', platform)
      if (platform === 'Desktop') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('mousedown', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      } else if (platform === 'Headset') {
        this.platformDetected = true;
        console.log('Adding Click Event to Orb')
        this.element.addEventListener('click', function() {
          this.leaveOff = !this.leaveOff;
          console.log('Clicked and I am ', this.leaveOff ? 'off': 'on')
        });
      }
    }
  }
});