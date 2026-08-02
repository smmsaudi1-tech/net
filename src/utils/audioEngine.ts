// Web Audio API Synthesizer for Subtle Micro-Feedback Sounds

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isUnlocked = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const unlock = () => {
        if (!this.ctx) {
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioCtx) {
            this.ctx = new AudioCtx();
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().then(() => {
            this.isUnlocked = true;
          }).catch(() => {});
        } else if (this.ctx && this.ctx.state === 'running') {
          this.isUnlocked = true;
        }
      };

      window.addEventListener('click', unlock, { once: false, capture: true });
      window.addEventListener('pointerdown', unlock, { once: false, capture: true });
      window.addEventListener('keydown', unlock, { once: false, capture: true });
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  // Subtle High-Tech Click Sound
  playClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      if (this.ctx.state !== 'running') return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Silently catch audio restrictions
    }
  }

  // Subtle Hover Micro-Tick (Only plays after user has interacted with the page)
  playHover() {
    try {
      if (!this.ctx || this.ctx.state !== 'running') return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.02);
    } catch {
      // Silently catch audio restrictions
    }
  }
}

export const soundEngine = new SoundEngine();
