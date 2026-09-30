/**
 * Rate Limiter Service for Formspree and Booking Form Submissions
 * Prevents spam and abuse by tracking submission timestamps in localStorage.
 */

const STORAGE_KEY = 'cinefolio_form_submissions';
const MAX_SUBMISSIONS_PER_WINDOW = 3;
const WINDOW_DURATION_MS = 60 * 60 * 1000; // 1 hour
const MIN_COOLDOWN_MS = 30 * 1000; // 30 seconds between consecutive submissions

export interface RateLimitStatus {
  allowed: boolean;
  remainingSubmissions: number;
  maxSubmissions: number;
  cooldownActive: boolean;
  cooldownSecondsRemaining: number;
  windowMinutesRemaining: number;
  message: string;
}

export class FormRateLimiter {
  private static getTimestamps(): number[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: number[] = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      const now = Date.now();
      // Filter out timestamps older than the sliding window
      return parsed.filter((ts) => typeof ts === 'number' && now - ts < WINDOW_DURATION_MS);
    } catch {
      return [];
    }
  }

  private static saveTimestamps(timestamps: number[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));
    } catch (e) {
      console.warn('Unable to persist rate limit timestamp:', e);
    }
  }

  public static checkLimit(): RateLimitStatus {
    const timestamps = this.getTimestamps();
    const now = Date.now();

    // Check minimum cooldown between consecutive submissions
    if (timestamps.length > 0) {
      const lastSubmission = timestamps[timestamps.length - 1];
      const elapsedSinceLast = now - lastSubmission;
      if (elapsedSinceLast < MIN_COOLDOWN_MS) {
        const cooldownRemaining = Math.ceil((MIN_COOLDOWN_MS - elapsedSinceLast) / 1000);
        return {
          allowed: false,
          remainingSubmissions: Math.max(0, MAX_SUBMISSIONS_PER_WINDOW - timestamps.length),
          maxSubmissions: MAX_SUBMISSIONS_PER_WINDOW,
          cooldownActive: true,
          cooldownSecondsRemaining: cooldownRemaining,
          windowMinutesRemaining: 0,
          message: `Please wait ${cooldownRemaining}s before submitting another brief.`,
        };
      }
    }

    // Check hourly limit
    if (timestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      const oldestTimestamp = timestamps[0];
      const timeUntilExpiry = Math.max(0, WINDOW_DURATION_MS - (now - oldestTimestamp));
      const minutesRemaining = Math.ceil(timeUntilExpiry / (60 * 1000));
      return {
        allowed: false,
        remainingSubmissions: 0,
        maxSubmissions: MAX_SUBMISSIONS_PER_WINDOW,
        cooldownActive: false,
        cooldownSecondsRemaining: 0,
        windowMinutesRemaining: minutesRemaining,
        message: `Hourly submission limit reached (${MAX_SUBMISSIONS_PER_WINDOW}/${MAX_SUBMISSIONS_PER_WINDOW}). Please wait ${minutesRemaining} minute${minutesRemaining === 1 ? '' : 's'} or contact via WhatsApp.`,
      };
    }

    const remaining = MAX_SUBMISSIONS_PER_WINDOW - timestamps.length;
    return {
      allowed: true,
      remainingSubmissions: remaining,
      maxSubmissions: MAX_SUBMISSIONS_PER_WINDOW,
      cooldownActive: false,
      cooldownSecondsRemaining: 0,
      windowMinutesRemaining: 0,
      message: `${remaining} submission${remaining === 1 ? '' : 's'} remaining this hour.`,
    };
  }

  public static recordSubmission(): RateLimitStatus {
    const timestamps = this.getTimestamps();
    timestamps.push(Date.now());
    this.saveTimestamps(timestamps);
    return this.checkLimit();
  }

  public static resetLimits(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
}
