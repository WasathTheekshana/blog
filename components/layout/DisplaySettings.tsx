"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FONTS, SIZES, THEMES, type PrefKey } from "@/lib/prefs";
import { usePref } from "@/components/usePref";

function Group({
  legend,
  name,
  options,
}: {
  legend: string;
  name: PrefKey;
  options: readonly { id: string; label: string }[];
}) {
  const [value, setValue] = usePref(name);
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="text-sm text-muted mb-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.id} className="opt">
            <input type="radio" name={`pref-${name}`} value={o.id} checked={value === o.id} onChange={() => setValue(o.id)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** A disclosure button (not a menu): all controls are real radios, reachable with Tab and arrow keys. */
export function DisplaySettings() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button ref={button} type="button" className="btn" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
        Display
      </button>
      {open ? (
        <div id={panelId} role="group" aria-label="Display settings" className="panel absolute right-0 top-full mt-2 z-40 w-[min(22rem,calc(100vw-2rem))] p-4 space-y-5">
          <Group legend="Colour theme" name="theme" options={THEMES} />
          <Group legend="Reading font" name="font" options={FONTS} />
          <Group legend="Text size" name="size" options={SIZES} />
          <p className="text-xs text-muted">Saved on this device. Your choice also respects your system&apos;s dark, light and high-contrast settings the first time you visit.</p>
        </div>
      ) : null}
    </div>
  );
}
