import { motion, AnimatePresence } from "motion/react";
import { Bell, Wifi, Bluetooth, Moon, Plane, Focus, Sun, Volume2 } from "lucide-react";

const notifications = [
  { app: "DESI", title: "Daily summary ready", body: "12 events, 3 priority items.", time: "now", color: "#00E5FF" },
  { app: "Calendar", title: "Standup in 15 min", body: "With the design team.", time: "9:45", color: "#7B61FF" },
  { app: "Store", title: "Aurora 2.0 is live", body: "Update available for download.", time: "8:12", color: "#00FFA3" },
  { app: "System", title: "Neural cache optimized", body: "Reclaimed 1.4 GB of memory.", time: "Yesterday", color: "#00E5FF" },
];

const toggles = [
  { icon: Wifi, label: "Wi-Fi", on: true },
  { icon: Bluetooth, label: "Bluetooth", on: true },
  { icon: Moon, label: "Focus", on: false },
  { icon: Plane, label: "Airplane", on: false },
  { icon: Focus, label: "Do Not Disturb", on: false },
  { icon: Sun, label: "Night Light", on: true },
];

export function NotificationCenter({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60]"
          />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="glass-strong desios-scrollbar fixed right-4 top-4 bottom-24 z-[70] w-[360px] overflow-auto rounded-3xl p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide text-white/90">
                Notification Hub
              </h3>
              <button className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white">
                Clear all
              </button>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2">
              {toggles.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.label}
                    className="flex flex-col items-center gap-1 rounded-xl border border-white/10 p-3 transition hover:bg-white/5"
                    style={{
                      background: t.on
                        ? "linear-gradient(135deg, rgba(0,229,255,0.18), rgba(123,97,255,0.12))"
                        : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{ color: t.on ? "#00E5FF" : "rgba(255,255,255,0.4)" }}
                    />
                    <span className="text-[10px] text-white/60">{t.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
              <Volume2 className="h-3 w-3" /> Volume
            </div>
            <div className="mb-4 h-1.5 rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full" style={{ background: "linear-gradient(90deg, #00E5FF, #7B61FF)" }} />
            </div>

            <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
              <Bell className="h-3 w-3" /> Recent
            </div>
            <div className="space-y-2">
              {notifications.map((n, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span style={{ color: n.color }}>{n.app}</span>
                    <span className="text-white/40">{n.time}</span>
                  </div>
                  <div className="mt-1 text-sm font-medium text-white">{n.title}</div>
                  <div className="text-xs text-white/60">{n.body}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}