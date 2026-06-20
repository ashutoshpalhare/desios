import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AppDef, AppId } from "./types";

interface Props {
  open: boolean;
  apps: AppDef[];
  onClose: () => void;
  onLaunch: (id: AppId) => void;
}

const suggestions = [
  "Open Notes and create a new project plan",
  "Show me system performance",
  "Launch the browser with my pinned tabs",
  "Summarize today's notifications",
];
const recent: { label: string; appId: AppId }[] = [
  { label: "Design Sprint Notes", appId: "notes" },
  { label: "github.com/desios", appId: "browser" },
  { label: "system.log", appId: "terminal" },
];

export function CommandCenter({ open, apps, onClose, onLaunch }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery("");
  }, [open]);

  const filtered = apps.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[12vh] backdrop-blur-md"
          style={{ background: "rgba(7,11,20,0.55)" }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong w-[680px] max-w-[92vw] overflow-hidden rounded-3xl"
            style={{ boxShadow: "0 30px 80px -10px rgba(0,229,255,0.25), 0 0 0 1px rgba(255,255,255,0.1) inset" }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #00E5FF, #7B61FF)",
                  animation: "desios-pulse-glow 3s ease-in-out infinite",
                }}
              >
                <Sparkles className="h-4 w-4 text-black" />
              </div>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask DESI anything, or search apps…"
                className="flex-1 bg-transparent text-lg text-white placeholder:text-white/30 focus:outline-none"
              />
              <kbd className="rounded bg-white/10 px-2 py-1 text-xs text-white/50">esc</kbd>
            </div>

            <div className="grid grid-cols-2 gap-4 p-5">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
                  <Sparkles className="h-3 w-3" /> AI Suggestions
                </div>
                <div className="space-y-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={onClose}
                      className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                    >
                      <Search className="h-3.5 w-3.5 text-white/30" />
                      <span className="flex-1 truncate">{s}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                    </button>
                  ))}
                </div>

                <div className="mt-5 mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
                  <Clock className="h-3 w-3" /> Recent
                </div>
                <div className="space-y-1.5">
                  {recent.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => {
                        onLaunch(r.appId);
                        onClose();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--desios-mint)]" />
                      <span className="truncate">{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
                  <TrendingUp className="h-3 w-3" /> Apps
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(query ? filtered : apps).slice(0, 9).map((app) => {
                    const Icon = app.icon;
                    return (
                      <button
                        key={app.id}
                        onClick={() => {
                          onLaunch(app.id);
                          onClose();
                        }}
                        className="group flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center transition hover:scale-105 hover:bg-white/5"
                      >
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${app.accent}40, ${app.accent}10)`,
                          }}
                        >
                          <Icon className="h-5 w-5" style={{ color: app.accent }} />
                        </div>
                        <span className="text-[11px] text-white/70">{app.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div
                  className="mt-4 rounded-xl border border-white/10 p-3"
                  style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(123,97,255,0.08))" }}
                >
                  <div className="text-[10px] uppercase tracking-widest text-white/50">
                    Productivity Insight
                  </div>
                  <div className="mt-1 text-xs text-white/80">
                    You're 23% more focused today. Schedule deep work at 2:00 PM.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}