"use client";

import { Suspense, type ReactNode } from "react";

interface SceneLoaderProps {
  children: ReactNode;
}

export default function SceneLoader({ children }: SceneLoaderProps) {
  return (
    <Suspense
      fallback={
        <div
          className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-violet/5"
          aria-hidden="true"
        />
      }
    >
      {children}
    </Suspense>
  );
}
