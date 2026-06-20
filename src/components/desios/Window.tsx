import { motion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { X, Minus, Square } from "lucide-react";
import type { WindowState } from "./types";

interface Props {
  win: WindowState;
  title: string;
  accent: string;
  icon: ReactNode;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (w: number, h: number) => void;
}

export function Window({
  win,
  title,
  accent,
  icon,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
}: Props) {
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const resizeRef = useRef<{ x: number; y: number; ow: number; oh: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const startDrag = (e: React.PointerEvent) => {
    if (win.maximized) return;
    onFocus();
    dragRef.current = { x: e.clientX, y: e.clientY, ox: win.x, oy: win.y };
    setDragging(true);
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onDrag = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    onMove(
      dragRef.current.ox + (e.clientX - dragRef.current.x),
      Math.max(0, dragRef.current.oy + (e.clientY - dragRef.current.y)),
    );
  };
  const endDrag = () => {
    dragRef.current = null;
    setDragging(false);
  };

  const startResize = (e: React.PointerEvent) => {
    e.stopPropagation();
    resizeRef.current = { x: e.clientX, y: e.clientY, ow: win.w, oh: win.h };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onResizeMove = (e: React.PointerEvent) => {
    if (!resizeRef.current) return;
    onResize(
      Math.max(360, resizeRef.current.ow + (e.clientX - resizeRef.current.x)),
      Math.max(280, resizeRef.current.oh + (e.clientY - resizeRef.current.y)),
    );
  };
  const endResize = () => {
    resizeRef.current = null;
  };

  const style = win.maximized
    ? { left: 12, top: 12, width: "calc(100vw - 24px)", height: "calc(100vh - 110px)" }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{
        opacity: win.minimized ? 0 : 1,
        scale: win.minimized ? 0.3 : 1,
        y: win.minimized ? 400 : 0,
      }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      onPointerDown={onFocus}
      className="glass-strong absolute flex flex-col overflow-hidden rounded-2xl"
      style={{
        ...style,
        zIndex: win.z,
        pointerEvents: win.minimized ? "none" : "auto",
        boxShadow: `0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px -20px ${accent}55, 0 0 0 1px rgba(255,255,255,0.08) inset`,
      }}
    >
      <div
        onPointerDown={startDrag}
        onPointerMove={onDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={onMaximize}
        className={`flex h-11 shrink-0 items-center gap-3 border-b border-white/10 px-4 ${dragging ? "cursor-grabbing" : "cursor-grab"} select-none`}
        style={{
          background: `linear-gradient(90deg, ${accent}18, transparent 60%)`,
        }}
      >
        <div className="flex items-center gap-1.5">
          <button
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-400 transition"
            aria-label="Close"
          />
          <button
            onClick={onMinimize}
            className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition"
            aria-label="Minimize"
          />
          <button
            onClick={onMaximize}
            className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-400 transition"
            aria-label="Maximize"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span style={{ color: accent }}>{icon}</span>
          <span className="font-medium tracking-wide">{title}</span>
        </div>
        <div className="ml-auto flex items-center gap-1 text-white/40">
          <button onClick={onMinimize} className="rounded p-1 hover:bg-white/10">
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button onClick={onMaximize} className="rounded p-1 hover:bg-white/10">
            <Square className="h-3 w-3" />
          </button>
          <button onClick={onClose} className="rounded p-1 hover:bg-red-500/30">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="desios-scrollbar relative flex-1 overflow-auto">{children}</div>
      {!win.maximized && (
        <div
          onPointerDown={startResize}
          onPointerMove={onResizeMove}
          onPointerUp={endResize}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
          style={{
            background:
              "linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.3) 50%)",
          }}
        />
      )}
    </motion.div>
  );
}