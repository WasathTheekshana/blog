"use client";

import { useCallback, useSyncExternalStore } from "react";
import { PREF_DEFAULTS, PREF_OPTIONS, type PrefKey } from "@/lib/prefs";

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/** Reads the value the <head> boot script already applied to <html>, so server and client agree. */
export function usePref(key: PrefKey): [string, (value: string) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      const v = document.documentElement.dataset[key];
      return v && PREF_OPTIONS[key].some((o) => o.id === v) ? v : PREF_DEFAULTS[key];
    },
    () => PREF_DEFAULTS[key],
  );

  const set = useCallback(
    (next: string) => {
      document.documentElement.dataset[key] = next;
      try {
        localStorage.setItem(`pref-${key}`, next);
      } catch {
        /* storage blocked: the choice still applies for this visit */
      }
      listeners.forEach((l) => l());
    },
    [key],
  );

  return [value, set];
}
