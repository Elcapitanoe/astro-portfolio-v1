import { animate, easeIn, easeOut, type AnimationPlaybackControls } from "motion";
import { useEffect, useMemo, useState } from "react";

type FadeOptions = {
  duration?: number;
  delay?: number;
};

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia(MOTION_QUERY).matches;
}

export function useReducedMotion() {
  const [prefers, setPrefers] = useState(prefersReducedMotion());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(MOTION_QUERY);
    const handleChange = () => setPrefers(media.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return prefers;
}

export function fadeInScale(
  element: HTMLElement | null,
  { duration = 0.28, delay = 0 }: FadeOptions = {},
): AnimationPlaybackControls | null {
  if (!element) return null;
  if (prefersReducedMotion()) {
    element.style.opacity = "1";
    element.style.transform = "scale(1)";
    return null;
  }

  return animate(
    element,
    [
      { opacity: 0, transform: "scale(0.96)" },
      { opacity: 1, transform: "scale(1)" },
    ] as any,
    {
      duration,
      delay,
      easing: easeOut,
    } as any,
  );
}

export function fadeOutScale(
  element: HTMLElement | null,
  { duration = 0.22 }: FadeOptions = {},
): AnimationPlaybackControls | null {
  if (!element) return null;
  if (prefersReducedMotion()) {
    return animate(element, { opacity: 0 }, { duration: 0 });
  }

  return animate(
    element,
    [
      { opacity: 1, transform: "scale(1)" },
      { opacity: 0, transform: "scale(0.98)" },
    ] as any,
    {
      duration,
      easing: easeIn,
    } as any,
  );
}

export function useFadeScale() {
  const reduce = useReducedMotion();

  return useMemo(
    () => ({
      enter: (element: HTMLElement | null, options?: FadeOptions) =>
        reduce ? null : fadeInScale(element, options),
      exit: (element: HTMLElement | null, options?: FadeOptions) =>
        reduce ? fadeOutScale(element, { duration: 0 }) : fadeOutScale(element, options),
    }),
    [reduce],
  );
}
