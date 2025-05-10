// This file provides a global way to access the Lenis instance
// Useful for programmatic scrolling or other interactions with Lenis from anywhere

import Lenis from "lenis";

/**
 * A singleton to manage the Lenis instance globally
 */
class LenisManager {
  private static instance: LenisManager;
  private lenisInstance: Lenis | null = null;
  private _isScrolling: boolean = false;
  private scrollTimerId: ReturnType<typeof setTimeout> | null = null;
  private scrollThrottleTime: number = 150; // ms to consider scrolling stopped

  /**
   * Get the singleton instance of LenisManager
   */
  public static getInstance(): LenisManager {
    if (!LenisManager.instance) {
      LenisManager.instance = new LenisManager();
    }
    return LenisManager.instance;
  }

  /**
   * Set the Lenis instance
   */
  public setLenisInstance(lenis: Lenis): void {
    this.lenisInstance = lenis;
    
    // Set up scroll event to track scrolling state
    lenis.on('scroll', this.onScroll.bind(this));
  }
  /**
   * Get the current Lenis instance
   */
  public getLenis(): Lenis | null {
    return this.lenisInstance;
  }
  
  /**
   * Check if currently scrolling
   */
  public isScrolling(): boolean {
    return this._isScrolling;
  }
  
  /**
   * Scroll event handler to track scrolling state
   */
  private onScroll(): void {
    // Set scrolling to true
    this._isScrolling = true;
    
    // Clear any existing timer
    if (this.scrollTimerId !== null) {
      clearTimeout(this.scrollTimerId);
    }
    
    // Set timer to mark scrolling as finished after delay
    this.scrollTimerId = setTimeout(() => {
      this._isScrolling = false;
      this.scrollTimerId = null;
    }, this.scrollThrottleTime);
  }

  /**
   * Scroll to a specific element
   */  public scrollTo(target: string | HTMLElement | number, options?: { 
    offset?: number; 
    duration?: number; 
    immediate?: boolean;
    easing?: (t: number) => number;
  }): void {
    if (this.lenisInstance) {
      // Ensure we have the scroll target and apply the options
      this.lenisInstance.scrollTo(target, {
        lerp: options?.immediate ? 1 : undefined, // Use lerp 1 for immediate scrolling
        ...options
      });
    }
  }

  /**
   * Stop scrolling
   */
  public stop(): void {
    if (this.lenisInstance) {
      this.lenisInstance.stop();
    }
  }

  /**
   * Start scrolling
   */
  public start(): void {
    if (this.lenisInstance) {
      this.lenisInstance.start();
    }
  }
}

export const lenisManager = LenisManager.getInstance();
