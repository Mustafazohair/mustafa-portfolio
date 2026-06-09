import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
  afterNextRender,
} from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: false,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {

  visible = true;
  progress = 0;

  constructor(
    private cdRef: ChangeDetectorRef,
    private zone: NgZone,
  ) {
    afterNextRender(() => {
      this.lockScroll();
      this.animateProgress();
    });
  }

  /** Block all scrolling while loader is active */
  private lockScroll(): void {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  /** Restore normal scrolling */
  private unlockScroll(): void {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  /** Animate progress 0 → 100 using requestAnimationFrame */
  private animateProgress(): void {
    const DURATION = 2500;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / DURATION, 1);

      // Ease-out cubic curve for a natural deceleration feel
      const eased = 1 - Math.pow(1 - raw, 3);
      const value = Math.round(eased * 100);

      if (value !== this.progress) {
        this.progress = value;
        this.cdRef.detectChanges();
      }

      if (raw < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure we land exactly on 100
        this.progress = 100;
        this.cdRef.detectChanges();

        // Brief pause at 100% before fading out
        setTimeout(() => {
          this.visible = false;
          this.cdRef.detectChanges();

          // Wait for the CSS opacity transition (600ms) to finish,
          // then unlock scroll and reset position
          setTimeout(() => {
            this.unlockScroll();
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          }, 650);
        }, 300);
      }
    };

    // Run the rAF loop outside Angular zone to avoid
    // triggering change detection on every animation frame
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(step);
    });
  }
}