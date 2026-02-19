"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  stagger = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  if (stagger) {
    return (
      <div
        ref={ref}
        className={cn("reveal-stagger", isVisible && "is-visible", className)}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("reveal-fade", isVisible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
