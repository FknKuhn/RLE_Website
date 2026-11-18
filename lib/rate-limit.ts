import { NextRequest, NextResponse } from "next/server";

// Simple in-memory sliding-window rate limiter.
// The site runs as a single Node server (Docker, output: "standalone"), so
// memory is shared by every request. If it is ever scaled to multiple
// instances or moved to serverless, swap this for a shared store (e.g. Redis).

type Bucket = number[]; // request timestamps (ms)

const stores = new Map<string, Map<string, Bucket>>();

export interface RateLimitRule {
  /** Unique name so different rules don't share counters */
  name: string;
  /** Max requests allowed within the window */
  limit: number;
  /** Window length in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the caller may try again (0 when ok) */
  retryAfter: number;
}

export function rateLimit(rule: RateLimitRule, key: string): RateLimitResult {
  let store = stores.get(rule.name);

  if (!store) {
    store = new Map();
    stores.set(rule.name, store);
  }

  const now = Date.now();
  const windowStart = now - rule.windowMs;
  const hits = (store.get(key) ?? []).filter((t) => t > windowStart);

  if (hits.length >= rule.limit) {
    store.set(key, hits);

    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((hits[0] + rule.windowMs - now) / 1000)),
    };
  }

  hits.push(now);
  store.set(key, hits);

  return { ok: true, retryAfter: 0 };
}

/** Checks several rules at once; only records a hit if every rule passes. */
export function rateLimitAll(
  rules: RateLimitRule[],
  key: string,
): RateLimitResult {
  const now = Date.now();

  for (const rule of rules) {
    const hits = (stores.get(rule.name)?.get(key) ?? []).filter(
      (t) => t > now - rule.windowMs,
    );

    if (hits.length >= rule.limit) {
      return {
        ok: false,
        retryAfter: Math.max(1, Math.ceil((hits[0] + rule.windowMs - now) / 1000)),
      };
    }
  }

  for (const rule of rules) rateLimit(rule, key);

  return { ok: true, retryAfter: 0 };
}

/**
 * Client IP for rate limiting.
 *
 * In production set CLIENT_IP_HEADER to the single header your reverse proxy
 * overwrites with the real visitor IP (the included Caddyfile sets X-Real-IP).
 * Only that header is trusted, so visitors can't fake their IP to dodge limits.
 * Without it (e.g. local dev) this falls back to the common proxy headers.
 */
export function getClientIp(request: NextRequest): string {
  const trustedHeader = process.env.CLIENT_IP_HEADER;

  if (trustedHeader) {
    return request.headers.get(trustedHeader)?.split(",")[0].trim() || "unknown";
  }

  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) return forwarded.split(",")[0].trim();

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

export function tooManyRequests(retryAfter: number, message?: string) {
  const minutes = Math.ceil(retryAfter / 60);

  return NextResponse.json(
    {
      error:
        message ??
        `Too many requests. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

// Drop expired entries every 10 minutes so memory doesn't grow forever
const MAX_WINDOW_MS = 24 * 60 * 60 * 1000;

if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const cutoff = Date.now() - MAX_WINDOW_MS;

    stores.forEach((store) => {
      store.forEach((hits, key) => {
        if (hits.every((t) => t <= cutoff)) store.delete(key);
      });
    });
  }, 10 * 60 * 1000);

  // Don't keep the process alive just for cleanup
  (timer as { unref?: () => void }).unref?.();
}
