// High-End Non-Intrusive Smooth Scroll Observer for GSAP & Velocity Tracking
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class SmoothScrollEngine {
  private currentY = 0;
  private velocity = 0;
  private animId: number | null = null;
  private isRunning = false;

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.currentY = window.scrollY;

    const update = () => {
      const actualY = window.scrollY;
      const prevY = this.currentY;
      
      // Interpolate current velocity smoothly
      this.currentY += (actualY - this.currentY) * 0.2;
      this.velocity = actualY - prevY;

      // Update scroll velocity CSS variable for UI dynamics
      document.documentElement.style.setProperty(
        '--scroll-velocity',
        (Math.abs(this.velocity) * 0.1).toFixed(3)
      );

      // Keep GSAP ScrollTrigger perfectly in sync on frame update
      if (Math.abs(this.velocity) > 0.01) {
        ScrollTrigger.update();
      }

      this.animId = requestAnimationFrame(update);
    };

    update();
  }

  stop() {
    this.isRunning = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }
}

export const smoothScroll = new SmoothScrollEngine();
