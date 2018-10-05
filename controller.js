let platform = null;

console.log('Platform: ', platform);
console.log('Headset Connected? ', AFRAME.utils.device.checkHeadsetConnected())

AFRAME.registerComponent('check-platform', {
    init: function () {
        var camera = document.getElementsByTagName('a-camera')[0];
        var cursor = `
          <a-entity cursor="fuse: false; fuseTimeout: 500"
                    position="0 0 -1"
                    geometry="primitive: ring; radiusInner: 0.005; radiusOuter: 0.01"
                    material="color: grey; shader: flat"
                    raycaster="objects: .UIbutton">
          </a-entity>  
         `;
        var oculusControllers = `
            <!-- Custom Controls -->
            <a-entity laser-controls="hand: left;" oculus-touch-controls="model: false; orientationOffset: -30 0 0" mixin="gun-left"></a-entity>
            <a-entity laser-controls="hand: right;" oculus-touch-controls="model: false; orientationOffset: -30 0 0" mixin="gun-right"></a-entity>
         `;
         var tex = new THREE.TextureLoader().load('./assets/gun-texture.png');

         document.addEventListener('model-loaded', (e) => {
              if (e.srcElement.components["oculus-touch-controls"].data.hand === 'left') {
                console.log(e.srcElement.components["oculus-touch-controls"].data.hand);
                e.detail.model.traverse(function(node) {
                    if (node.isMesh) node.material.map = tex;
                });
              } 
          });

        if (!AFRAME.utils.device.checkHeadsetConnected()) {
            platform = 'Desktop';
            console.log('Adding Cursor for ', platform);
            camera.insertAdjacentHTML('beforeend', cursor);
        } else if (!AFRAME.utils.device.isMobile() && AFRAME.utils.device.checkHeadsetConnected()) {
            platform = 'Headset';
            console.log('Adding Cursor for ', platform);
            this.el.sceneEl.insertAdjacentHTML('beforeend', oculusControllers);
        }
    }
});