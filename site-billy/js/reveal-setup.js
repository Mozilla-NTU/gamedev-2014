// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: false,
  progress: true,
  history: true,
  center: true,

  theme: Reveal.getQueryHash().theme || 'night', // available themes are in /css/theme
  transition: Reveal.getQueryHash().transition || 'linear', // default/cube/page/concave/zoom/linear/fade/none

  // Parallax scrolling
  // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
  // parallaxBackgroundSize: '2100px 900px',

  // Optional libraries used to extend on reveal.js
  dependencies: [
    { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
    //{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    //{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
    { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
    { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
  ]
});


/*
 * My animation manager for canvas slides
 * Render functions are stored as property on `window.animations`.
 * Running animation frames are stored at `window.animFrame`.
 * Each time a slide changes, turn off the previous running
 * animation (if it exists) and turn on the animation associated
 * with the current slide (if it exists);
 * Animation names are stored as the attribute `animation` on the
 * slide element.
 */
if (!window.animations) window.animations = {};
var animName = null;

Reveal.addEventListener('slidechanged', function (evt) {
  // evt.previousSlide, evt.currentSlide, evt.indexh, evt.indexv
  
  if (window.animFrame) {
    window.cancelAnimationFrame(window.animFrame);
    console.log("stopping animation: " + animName);
    window.animFrame = null;
    animName = null;
  }
  animName = evt.currentSlide.getAttribute('animation');
  if (animName) {
    var fn = window.animations[animName];
    window.animFrame = window.requestAnimationFrame(fn);
    console.log("starting animation: " + animName);
  }
});
