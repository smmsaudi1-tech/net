// High-End Smooth Scroll Engine with Velocity Interpolation & Momentum Dampening
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class SmoothScrollEngine {
  private currentY = 0;
  private targetY = 0;
  private velocity = 0;
  private ease = 0.1;
  private animId: number | null = null;
  private isRunning = false;
  private isWheelScrolling = false;
  private wheelTimeout: ReturnType<typeof setTimeout> | null = null;

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.targetY = window.scrollY;
    this.currentY = window.scrollY;

    const onScroll = () => {
      if (!this.isWheelScrolling) {
        this.targetY = window.scrollY;
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Allow Ctrl+wheel for zooming
      if (e.ctrlKey) return;
      
      this.isWheelScrolling = true;
      if (this.wheelTimeout) clearTimeout(this.wheelTimeout);
      this.wheelTimeout = setTimeout(() => {
        this.isWheelScrolling = false;
      }, 400);

      // Smooth target calculation with wheel momentum
      const delta = e.deltaY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.targetY = Math.min(Math.max(0, this.targetY + delta * 1.1), maxScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });

    const update = () => {
      if (this.isWheelScrolling) {
        const diff = this.targetY - window.scrollY;
        if (Math.abs(diff) > 0.5) {
          const nextY = window.scrollY + diff * this.ease;
          window.scrollTo({ top: nextY, behavior: 'instant' as ScrollBehavior });
          ScrollTrigger.update();
        }
      }

      const prevY = this.currentY;
      this.currentY += (window.scrollY - this.currentY) * 0.15;
      this.velocity = this.currentY - prevY;

      // Update scroll velocity CSS variable for GSAP & UI elements
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
    if (this.wheelTimeout) clearTimeout(this.wheelTimeout);
  }
}

export const smoothScroll = new SmoothScrollEngine();
