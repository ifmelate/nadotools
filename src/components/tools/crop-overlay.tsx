"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface CropOverlayProps {
  imageWidth: number;
  imageHeight: number;
  cropRect: CropRect;
  onCropChange: (rect: CropRect) => void;
  aspectLocked: boolean;
  aspectRatio: number;
}

type DragTarget =
  | "move"
  | "nw"
  | "n"
  | "ne"
  | "e"
  | "se"
  | "s"
  | "sw"
  | "w";

const MIN_CROP = 10;
const HANDLE_SIZE = 10;

const CURSORS: Record<DragTarget, string> = {
  move: "move",
  nw: "nwse-resize",
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
};

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export function CropOverlay({
  imageWidth,
  imageHeight,
  cropRect,
  onCropChange,
  aspectLocked,
  aspectRatio,
}: CropOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    target: DragTarget;
    startX: number;
    startY: number;
    startRect: CropRect;
  } | null>(null);

  // Store container dimensions in state so we don't read the ref during render
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () =>
      setContainerSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute scale from state (no ref access)
  const getScaleFromSize = useCallback(
    (cw: number, ch: number) => {
      if (cw === 0 || ch === 0)
        return { sx: 1, sy: 1, offsetX: 0, offsetY: 0 };
      const imgAspect = imageWidth / imageHeight;
      const containerAspect = cw / ch;
      let displayW: number,
        displayH: number,
        offsetX: number,
        offsetY: number;
      if (imgAspect > containerAspect) {
        displayW = cw;
        displayH = cw / imgAspect;
        offsetX = 0;
        offsetY = (ch - displayH) / 2;
      } else {
        displayH = ch;
        displayW = ch * imgAspect;
        offsetX = (cw - displayW) / 2;
        offsetY = 0;
      }
      return {
        sx: displayW / imageWidth,
        sy: displayH / imageHeight,
        offsetX,
        offsetY,
      };
    },
    [imageWidth, imageHeight]
  );

  // For event handlers, read live from the ref
  const getScaleLive = useCallback(() => {
    const el = containerRef.current;
    if (!el) return { sx: 1, sy: 1, offsetX: 0, offsetY: 0 };
    return getScaleFromSize(el.clientWidth, el.clientHeight);
  }, [getScaleFromSize]);

  // Convert display delta to image delta (used in event handlers only)
  const toImageDelta = useCallback(
    (dx: number, dy: number) => {
      const { sx, sy } = getScaleLive();
      return { dx: dx / sx, dy: dy / sy };
    },
    [getScaleLive]
  );

  const constrainRect = useCallback(
    (rect: CropRect): CropRect => {
      let { x, y, w, h } = rect;
      w = Math.max(MIN_CROP, w);
      h = Math.max(MIN_CROP, h);
      x = clamp(x, 0, imageWidth - w);
      y = clamp(y, 0, imageHeight - h);
      w = Math.min(w, imageWidth - x);
      h = Math.min(h, imageHeight - y);
      return { x, y, w, h };
    },
    [imageWidth, imageHeight]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, target: DragTarget) => {
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragRef.current = {
        target,
        startX: e.clientX,
        startY: e.clientY,
        startRect: { ...cropRect },
      };
    },
    [cropRect]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragRef.current) return;
      const { target, startX, startY, startRect } = dragRef.current;
      const rawDx = e.clientX - startX;
      const rawDy = e.clientY - startY;
      const { dx, dy } = toImageDelta(rawDx, rawDy);

      let newRect: CropRect;

      if (target === "move") {
        newRect = constrainRect({
          x: startRect.x + dx,
          y: startRect.y + dy,
          w: startRect.w,
          h: startRect.h,
        });
      } else {
        let { x, y, w, h } = startRect;
        if (target.includes("w")) {
          x = x + dx;
          w = w - dx;
        }
        if (target.includes("e")) {
          w = w + dx;
        }
        if (target.includes("n")) {
          y = y + dy;
          h = h - dy;
        }
        if (target.includes("s")) {
          h = h + dy;
        }

        if (w < MIN_CROP) {
          if (target.includes("w")) x = startRect.x + startRect.w - MIN_CROP;
          w = MIN_CROP;
        }
        if (h < MIN_CROP) {
          if (target.includes("n")) y = startRect.y + startRect.h - MIN_CROP;
          h = MIN_CROP;
        }

        if (
          aspectLocked &&
          (target === "nw" ||
            target === "ne" ||
            target === "sw" ||
            target === "se")
        ) {
          const currentAspect = w / h;
          if (currentAspect > aspectRatio) {
            w = h * aspectRatio;
            if (target.includes("w")) x = startRect.x + startRect.w - w;
          } else {
            h = w / aspectRatio;
            if (target.includes("n")) y = startRect.y + startRect.h - h;
          }
        }

        newRect = constrainRect({ x, y, w, h });
      }

      onCropChange(newRect);
    },
    [toImageDelta, constrainRect, onCropChange, aspectLocked, aspectRatio]
  );

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Compute display rect from state (safe for render)
  const { sx, sy, offsetX, offsetY } = getScaleFromSize(
    containerSize.w,
    containerSize.h
  );
  const display = {
    x: cropRect.x * sx + offsetX,
    y: cropRect.y * sy + offsetY,
    w: cropRect.w * sx,
    h: cropRect.h * sy,
  };
  const hs = HANDLE_SIZE;

  const handles: { target: DragTarget; cx: number; cy: number }[] = [
    { target: "nw", cx: display.x, cy: display.y },
    { target: "n", cx: display.x + display.w / 2, cy: display.y },
    { target: "ne", cx: display.x + display.w, cy: display.y },
    {
      target: "e",
      cx: display.x + display.w,
      cy: display.y + display.h / 2,
    },
    { target: "se", cx: display.x + display.w, cy: display.y + display.h },
    {
      target: "s",
      cx: display.x + display.w / 2,
      cy: display.y + display.h,
    },
    { target: "sw", cx: display.x, cy: display.y + display.h },
    { target: "w", cx: display.x, cy: display.y + display.h / 2 },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ touchAction: "none" }}
    >
      {/* Dimmed overlay using box-shadow on crop area */}
      <div
        className="absolute border-2 border-white"
        style={{
          left: display.x,
          top: display.y,
          width: display.w,
          height: display.h,
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
          cursor: "move",
        }}
        onPointerDown={(e) => handlePointerDown(e, "move")}
      >
        {/* Rule of thirds grid lines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-full border-l border-white/30" />
          <div className="absolute left-2/3 top-0 h-full border-l border-white/30" />
          <div className="absolute left-0 top-1/3 w-full border-t border-white/30" />
          <div className="absolute left-0 top-2/3 w-full border-t border-white/30" />
        </div>
      </div>

      {/* Drag handles */}
      {handles.map(({ target, cx, cy }) => (
        <div
          key={target}
          className="absolute bg-white border border-gray-400 shadow-sm"
          style={{
            left: cx - hs / 2,
            top: cy - hs / 2,
            width: hs,
            height: hs,
            cursor: CURSORS[target],
          }}
          onPointerDown={(e) => handlePointerDown(e, target)}
        />
      ))}

      {/* Crop dimensions label */}
      <div
        className="absolute rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white pointer-events-none"
        style={{
          left: display.x + display.w / 2,
          top: display.y + display.h + 6,
          transform: "translateX(-50%)",
        }}
      >
        {Math.round(cropRect.w)} x {Math.round(cropRect.h)}
      </div>
    </div>
  );
}
