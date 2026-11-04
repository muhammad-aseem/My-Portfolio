import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
export function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let frame = 0,
      x = 0,
      y = 0,
      tx = 0,
      ty = 0,
      active = false;
    const draw = () => {
      x += (tx - x) * 0.13;
      y += (ty - y) * 0.13;
      el.style.setProperty("--mx", x + "px");
      el.style.setProperty("--my", y + "px");
      if (active) frame = requestAnimationFrame(draw);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const enter = (e: PointerEvent) => {
      move(e);
      x = tx;
      y = ty;
      active = true;
      el.dataset.lit = "true";
      cancelAnimationFrame(frame);
      draw();
    };
    const leave = () => {
      active = false;
      el.dataset.lit = "false";
      cancelAnimationFrame(frame);
    };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div ref={ref} className={"spotlight " + className}>
      {children}
    </div>
  );
}
