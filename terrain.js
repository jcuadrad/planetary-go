/* global AFRAME, THREE */

AFRAME.registerComponent('terrain', {
  schema: {
    src: {type: 'string'},
    normal: {type: 'string'},
    ambient: {type: 'string'}
  },
  
  init: function () {
    var el = this.el;
    
    if (el.hasLoaded) {
      var elements = document.querySelectorAll('a-entity');
      console.log(elements);
      var terrain = elements[3];

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