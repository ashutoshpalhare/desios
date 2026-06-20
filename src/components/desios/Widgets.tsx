import { motion } from "motion/react";
import { Cloud, Calendar, Activity, Newspaper, Sparkles, TrendingUp } from "lucide-react";
import { useRef, useState } from "react";

interface WidgetProps {
  initial: { x: number; y: number };
  children: React.ReactNode;
  className?: string;
}

function Widget({ initial, children, className = "" }: WidgetProps) {
  const [pos, setPos] = useState(initial);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.3 }}
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y };
        (e.target as Element).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        setPos({
          x: drag.current.ox + (e.clientX - drag.current.x),
          y: drag.current.oy + (e.clientY - drag.current.y),
        });
      }}
      onPointerUp={() => (drag.current = null)}
      style={{ left: pos.x, top: pos.y }}
      className={`glass absolute cursor-grab rounded-2xl p-4 active:cursor-grabbing ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Widgets() {
  return (
    <>
      <Widget initial={{ x: 32, y: 80 }} className="w-60">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">San Francisco</div>
            <div className="mt-1 text-4xl font-extralight text-white">62°</div>
            <div className="text-xs text-white/60">Partly cloudy</div>
          </div>
          <Cloud className="h-12 w-12 text-[var(--desios-cyan)]" />
        </div>
        <div className="mt-3 flex justify-between text-[10px] text-white/50">
          {["6AM", "9AM", "12PM", "3PM", "6PM"].map((t, i) => (
            <div key={t} className="flex flex-col items-center gap-1">
              <span>{t}</span>
              <div className="h-1 w-1 rounded-full bg-[var(--desios-cyan)]" style={{ opacity: 0.3 + i * 0.15 }} />
              <span className="text-white/70">{55 + i * 2}°</span>
            </div>
          ))}
        </div>
      </Widget>

      <Widget initial={{ x: 32, y: 270 }} className="w-60">
        <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
          <Calendar className="h-3 w-3" /> Today
        </div>
        <div className="space-y-2">
          {[
            { t: "10:00", title: "Design review", c: "#00E5FF" },
            { t: "14:00", title: "Deep work", c: "#00FFA3" },
            { t: "16:30", title: "AI roadmap sync", c: "#7B61FF" },
          ].map((e) => (
            <div key={e.title} className="flex items-center gap-2 text-xs">
              <div className="h-8 w-0.5 rounded" style={{ background: e.c }} />
              <div>
                <div className="text-white/50">{e.t}</div>
                <div className="text-white">{e.title}</div>
              </div>
            </div>
          ))}
        </div>
      </Widget>

      <Widget initial={{ x: 32, y: 480 }} className="w-60">
        <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
          <span className="flex items-center gap-2"><Activity className="h-3 w-3" /> System</span>
          <span className="text-[var(--desios-mint)]">Optimal</span>
        </div>
        {[
          { label: "CPU", v: 28, c: "#00E5FF" },
          { label: "Memory", v: 64, c: "#7B61FF" },
          { label: "Neural", v: 42, c: "#00FFA3" },
        ].map((s) => (
          <div key={s.label} className="mt-2">
            <div className="flex justify-between text-[10px] text-white/60">
              <span>{s.label}</span>
              <span>{s.v}%</span>
            </div>
            <div className="mt-1 h-1 rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.v}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full"
                style={{ background: s.c, boxShadow: `0 0 8px ${s.c}` }}
              />
            </div>
          </div>
        ))}
      </Widget>

      <Widget initial={{ x: typeof window !== "undefined" ? window.innerWidth - 300 : 1200, y: 80 }} className="w-60">
        <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
          <Sparkles className="h-3 w-3 text-[var(--desios-cyan)]" /> DESI Insight
        </div>
        <div className="text-sm text-white/90">
          You finished 3 deep-work blocks today.
        </div>
        <div className="mt-2 text-xs text-white/60">
          Want me to schedule tomorrow's mornings the same way?
        </div>
        <button className="mt-3 w-full rounded-lg py-2 text-xs font-medium" style={{ background: "linear-gradient(135deg, #00E5FF, #7B61FF)", color: "#070B14" }}>
          Yes, plan it
        </button>
      </Widget>

      <Widget initial={{ x: typeof window !== "undefined" ? window.innerWidth - 300 : 1200, y: 290 }} className="w-60">
        <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
          <TrendingUp className="h-3 w-3" /> Productivity
        </div>
        <div className="flex items-end gap-2">
          <div className="text-4xl font-extralight text-white">87</div>
          <div className="pb-1 text-xs text-[var(--desios-mint)]">+12%</div>
        </div>
        <div className="mt-2 flex items-end gap-1">
          {[40, 55, 35, 70, 60, 80, 90].map((v, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: v * 0.4 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex-1 rounded-t"
              style={{ background: `linear-gradient(180deg, #00E5FF, #7B61FF)` }}
            />
          ))}
        </div>
      </Widget>

      <Widget initial={{ x: typeof window !== "undefined" ? window.innerWidth - 300 : 1200, y: 480 }} className="w-60">
        <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
          <Newspaper className="h-3 w-3" /> News
        </div>
        <div className="space-y-2 text-xs">
          <div className="text-white">Neural co-processors hit 4nm milestone</div>
          <div className="text-white/60">Holographic displays now mainstream</div>
          <div className="text-white/60">AI agents collaborate across devices</div>
        </div>
      </Widget>
    </>
  );
}