"use client";

import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  speed?: number;
  enabled?: boolean;
}

export function useTypewriter(
  text: string,
  { speed = 28, enabled = true }: UseTypewriterOptions = {}
) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!enabled) return;

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed, enabled]);

  return enabled ? typed : text;
}
