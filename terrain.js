/* global AFRAME, THREE */

AFRAME.registerComponent('terrain', {
  schema: {
    src: {type: 'string'},
    normal: {type: 'string'},
    ambient: {type: 'string'}
  },
  
  init: function () {
    const el = this.el;
    const obj = el.getObject3D('mesh');
    console.log('OBJ', obj);
    // const mat = obj.el.getAttribute('material');

    if (el.hasLoaded) {
      var elements = document.querySelectorAll('a-entity');
      var terrain = elements[3];
      console.log('Matreial', el.getAttribute('material'));

      terrain.setAttribute('material', {
        src: this.data.src,
        repeat: '100 100',
        normalMap: this.data.normal,
        normalTextureRepeat: '100 100',
        ambientOcclusionMap: this.data.ambient,
        ambientOcclusionTextureOffset: '100 100'
      });
    }
  }
});