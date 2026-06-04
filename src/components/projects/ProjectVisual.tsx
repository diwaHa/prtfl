"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectVisualProps {
  title: string;
  category: string;
  image: string;
  color: string;
  className?: string;
}

export default function ProjectVisual({
  title,
  category,
  image,
  color,
  className,
}: ProjectVisualProps) {
  const [hasError, setHasError] = useState(false);
  const showImage = image.startsWith("/") && !hasError;

  return (
    <div
      className={cn(
        "relative h-48 w-full border-b border-surface-border/30 overflow-hidden",
        className
      )}
    >
      {showImage ? (
        <Image
          src={image}
          alt={`${title} — ${category}`}
          fill
          className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-b from-surface-light to-background flex items-center justify-center"
          aria-hidden={showImage ? undefined : true}
        >
          <div
            className="w-16 h-16 rounded-full blur-xl opacity-40 group-hover:scale-150 transition-transform duration-700"
            style={{ backgroundColor: color }}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent pointer-events-none" />

      <div className="absolute z-10 inset-0 flex items-center justify-center">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded bg-black/40 border text-foreground-muted"
          style={{ borderColor: `${color}30` }}
        >
          {category}
        </span>
      </div>
    </div>
  );
}
