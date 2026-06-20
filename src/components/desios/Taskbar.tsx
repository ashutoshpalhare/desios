import { motion } from "motion/react";
import { Search, Bell, Wifi, Battery, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { AppDef, AppId } from "./types";

interface Props {
  apps: AppDef[];
  openIds: AppId[];
  activeId: AppId | null;
  onLaunch: (id: AppId) => void;
  onOpenCommand: () => void;
  onOpenNotifications: () => void;
}

export function Taskbar({
  apps,
  openIds,
  activeId,
  onLaunch,
  onOpenCommand,
  onOpenNotifications,
}: Props) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pb-4">
      <div className="pointer-events-auto flex items-end gap-3">
        <motion.button
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          onClick={onOpenCommand}
          className="glass-strong group flex h-14 items-center gap-3 rounded-2xl px-5 transition hover:scale-[1.03]"
          style={{ boxShadow: "0 0 30px rgba(0,229,255,0.2)" }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: "linear-gradient(135deg, #00E5FF, #7B61FF)",
              boxShadow: "0 0 20px rgba(0,229,255,0.5)",
            }}
          >
            <Search className="h-4 w-4 text-black" />
          </div>
          <span className="text-sm text-white/60 group-hover:text-white">Ask DESI…</span>
          <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/50">⌘K</kbd>
        </motion.button>

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 180 }}
          className="glass-strong flex h-16 items-end gap-1 rounded-2xl px-3 py-2"
        >
          {apps.map((app) => {
            const Icon = app.icon;
            const isOpen = openIds.includes(app.id);
            const isActive = activeId === app.id;
            return (
              <motion.button
                key={app.id}
                whileHover={{ y: -10, scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => onLaunch(app.id)}
                className="group relative flex h-12 w-12 items-center justify-center rounded-xl transition"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${app.accent}40, ${app.accent}10)`
                    : "rgba(255,255,255,0.04)",
                  boxShadow: isActive ? `0 0 20px ${app.accent}60` : undefined,
                }}
                title={app.name}
              >
                <Icon className="h-5 w-5" />
                <span
                  className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100"
                >
                  {app.name}
                </span>
                {isOpen && (
                  <span
                    className="absolute -bottom-1 h-1 w-1 rounded-full"
                    style={{ background: app.accent, boxShadow: `0 0 8px ${app.accent}` }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.button
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          onClick={onOpenNotifications}
          className="glass-strong flex h-14 items-center gap-4 rounded-2xl px-5"
        >
          <div className="flex items-center gap-2 text-white/60">
            <Wifi className="h-3.5 w-3.5" />
            <Volume2 className="h-3.5 w-3.5" />
            <Battery className="h-3.5 w-3.5" />
          </div>
          <div className="text-right leading-tight">
            <div className="text-sm font-medium text-white">
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="text-[10px] text-white/50">
              {time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
            </div>
          </div>
          <Bell className="h-4 w-4 text-white/60" />
        </motion.button>
      </div>
    </div>
  );
}