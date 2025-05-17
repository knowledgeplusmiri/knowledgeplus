class CounterAnimation {
  constructor(elementId, startValue, endValue, duration = 3000) {
    this.element = document.getElementById(elementId);
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.startTimestamp = null;
    
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startAnimation();
          // Stop observing after first intersection
          this.observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Start observing the element
    this.observer.observe(this.element);
  }

  startAnimation() {
    this.animationFrame = window.requestAnimationFrame((timestamp) => {
      this.step(timestamp);
    });
  }

  step(timestamp) {
    // First animation frame
    if (!this.startTimestamp) {
      this.startTimestamp = timestamp;
    }

    // Calculate progress
    const progress = Math.min((timestamp - this.startTimestamp) / this.duration, 1);
    
    // Calculate current value
    const currentValue = this.calculateValue(progress);
    
    // Update element
    this.element.textContent = Math.floor(currentValue) + '+';

    // Continue animation if not complete
    if (progress < 1) {
      this.animationFrame = window.requestAnimationFrame((timestamp) => {
        this.step(timestamp);
      });
    }
  }

  calculateValue(progress) {
    // Linear interpolation between start and end
    return this.startValue + (this.endValue - this.startValue) * progress;
  }

  // Optional: method to cancel animation
  cancel() {
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
    }
  }
}

// Usage examples
function initializeCounters() {
  // Create multiple counter animations
  new CounterAnimation('counter2', 0, 269, 2000);     // Counting up
  new CounterAnimation('counter3', 0, 100, 2000);  // Custom duration
  new CounterAnimation('counter4', 0, 127, 2000);  // Custom duration
  new CounterAnimation('counter5', 0, 113, 2000);  // Custom duration
  new CounterAnimation('counter6', 0, 24, 2000);  // Custom duration

}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeCounters);
