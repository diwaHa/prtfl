"use client";

import { Toaster } from "@/components/ui/sonner";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast:
              "glass border border-surface-border/50 !bg-surface text-foreground shadow-xl",
          },
        }}
      />
    </>
  );
}
