let platform = null;

console.log('Headset Connected? ', AFRAME.utils.device.checkHeadsetConnected());

document.addEventListener('triggerdown', (e) => {
    console.log('triggered!')
})

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
        var cursorMobile = `
          <a-entity cursor="fuse: true; fuseTimeout: 500"
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

        if (!AFRAME.utils.device.checkHeadsetConnected()) {
            platform = 'Desktop';
            console.log('Adding Cursor for ', platform);
            camera.insertAdjacentHTML('beforeend', cursor);
        } else if (!AFRAME.utils.device.isMobile() && AFRAME.utils.device.checkHeadsetConnected()) {
            platform = 'Headset';
            console.log('Adding Cursor for ', platform);
            this.el.sceneEl.insertAdjacentHTML('beforeend', oculusControllers);
        } else if (AFRAME.utils.device.isMobile()) {
            platform = 'Mobile';
            console.log('Adding Cursor for ', platform);
            camera.insertAdjacentHTML('beforeend', cursorMobile);
        }
    }
});