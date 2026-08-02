// High-End Smooth Scroll Engine with Velocity Interpolation

export class SmoothScrollEngine {
  private currentY = 0;
  private targetY = 0;
  private velocity = 0;
  private ease = 0.08;
  private animId: number | null = null;
  private isRunning = false;

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    const onScroll = () => {
      this.targetY = window.scrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const update = () => {
      const prevY = this.currentY;
      this.currentY += (this.targetY - this.currentY) * this.ease;
      this.velocity = this.currentY - prevY;

      // Update scroll velocity CSS variable for GSAP & Framer elements
      document.documentElement.style.setProperty(
        '--scroll-velocity',
        (Math.abs(this.velocity) * 0.1).toFixed(3)
      );

      this.animId = requestAnimationFrame(update);
    };

    update();
  }

  stop() {
    this.isRunning = false;
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

export const smoothScroll = new SmoothScrollEngine();
