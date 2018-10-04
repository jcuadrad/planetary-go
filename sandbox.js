/* global AFRAME, THREE */

AFRAME.registerComponent('cursor-listener', {
    init: function () {
        var lastIndex = -1;
        var COLORS = ['red', 'green', 'blue'];
        this.el.addEventListener('raycaster-intersected', function (evt) {
          console.log('Intersecting box');
          lastIndex = (lastIndex + 1) % COLORS.length;
          this.setAttribute('material', 'color', COLORS[lastIndex]);
          console.log('I was clicked at: ', evt.detail.intersection.point);
        });
        this.el.addEventListener('raycaster-intersected-cleared', function (evt) {
          console.log('Not Intersecting anymore!');
        });
        this.el.addEventListener('click', function (evt) {
          console.log('CLICKED! anymore!');
        });
      }
  });