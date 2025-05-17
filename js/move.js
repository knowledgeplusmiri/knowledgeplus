document.addEventListener('DOMContentLoaded', function() {
  // Select the image by ID
  var animatedImage = document.getElementById('move1');
  
  var from = 10;     // Starting x position
  var to = 1000;     // Ending x position
  var duration = 9000; // Animation duration in milliseconds

  var start = new Date().getTime();
  var timer = setInterval(function() {
    var time = new Date().getTime() - start;
    var x = easeInOutQuart(time, from, to - from, duration);
    
    // Set the x attribute for the image
    animatedImage.setAttribute('x', x);
    
    // Stop the animation when it reaches the end
    if (time >= duration) {
      clearInterval(timer);
      // Optional: Reset to initial position after animation
      animatedImage.setAttribute('x', from);
    }
  }, 1000 / 60);  // 60 fps
});

//
// Easing function for smooth animation
//
function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}
