import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import {
  Home, FolderOpen, Globe, FileText, TerminalSquare, Sparkles,
  Settings as SettingsIcon, ShoppingBag, Music, Activity,
} from "lucide-react";
import { Wallpaper } from "./Wallpaper";
import { Boot } from "./Boot";
import { Taskbar } from "./Taskbar";
import { CommandCenter } from "./CommandCenter";
import { NotificationCenter } from "./NotificationCenter";
import { Assistant } from "./Assistant";
import { Widgets } from "./Widgets";
import { Window } from "./Window";
import type { AppDef, AppId, WindowState } from "./types";
import {
  HomeApp, ExplorerApp, BrowserApp, NotesApp, TerminalApp,
  SettingsApp, StoreApp, MediaApp, MonitorApp,
} from "./apps/Apps";

const APPS: AppDef[] = [
  { id: "home", name: "Home", icon: Home, accent: "#00E5FF", defaultSize: { w: 720, h: 520 } },
  { id: "explorer", name: "Explorer", icon: FolderOpen, accent: "#7B61FF", defaultSize: { w: 820, h: 540 } },
  { id: "browser", name: "Browser", icon: Globe, accent: "#00E5FF", defaultSize: { w: 880, h: 580 } },
  { id: "notes", name: "Notes", icon: FileText, accent: "#00FFA3", defaultSize: { w: 780, h: 520 } },
  { id: "terminal", name: "Terminal", icon: TerminalSquare, accent: "#00FFA3", defaultSize: { w: 720, h: 460 } },
  { id: "assistant", name: "DESI", icon: Sparkles, accent: "#7B61FF" },
  { id: "settings", name: "Settings", icon: SettingsIcon, accent: "#00E5FF", defaultSize: { w: 760, h: 520 } },
  { id: "store", name: "Store", icon: ShoppingBag, accent: "#7B61FF", defaultSize: { w: 860, h: 580 } },
  { id: "media", name: "Media", icon: Music, accent: "#00FFA3", defaultSize: { w: 800, h: 500 } },
  { id: "monitor", name: "Monitor", icon: Activity, accent: "#00E5FF", defaultSize: { w: 780, h: 540 } },
];

const workspaces = ["Work", "Gaming", "Study", "Creative"];

function renderApp(id: AppId) {
  switch (id) {
    case "home": return <HomeApp />;
    case "explorer": return <ExplorerApp />;
    case "browser": return <BrowserApp />;
    case "notes": return <NotesApp />;
    case "terminal": return <TerminalApp />;
    case "settings": return <SettingsApp />;
    case "store": return <StoreApp />;
    case "media": return <MediaApp />;
    case "monitor": return <MonitorApp />;
    default: return null;
  }
}

export function Desios() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [zCounter, setZCounter] = useState(10);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [workspace, setWorkspace] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const launch = useCallback((id: AppId) => {
    if (id === "assistant") {
      setAssistantOpen((o) => !o);
      return;
    }
    setWindows((ws) => {
      const existing = ws.find((w) => w.appId === id);
      const nextZ = zCounter + 1;
      setZCounter(nextZ);
      if (existing) {
        return ws.map((w) =>
          w.id === existing.id ? { ...w, minimized: false, z: nextZ } : w,
        );
      }
      const app = APPS.find((a) => a.id === id)!;
      const size = app.defaultSize ?? { w: 720, h: 480 };
      const offset = ws.length * 30;
      return [
        ...ws,
        {
          id: `${id}-${Date.now()}`,
          appId: id,
          x: 200 + offset,
          y: 80 + offset,
          w: size.w,
          h: size.h,
          z: nextZ,
          minimized: false,
          maximized: false,
        },
      ];
    });
  }, [zCounter]);

  // open home on boot
  useEffect(() => {
    if (booted && windows.length === 0) {
      setTimeout(() => launch("home"), 400);
    }
  }, [booted]); // eslint-disable-line react-hooks/exhaustive-deps

  const focusWin = (id: string) => {
    setWindows((ws) => {
      const nextZ = zCounter + 1;
      setZCounter(nextZ);
      return ws.map((w) => (w.id === id ? { ...w, z: nextZ, minimized: false } : w));
    });
  };

  const activeAppId = windows
    .filter((w) => !w.minimized)
    .sort((a, b) => b.z - a.z)[0]?.appId ?? null;

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <Wallpaper />

      <AnimatePresence>
        {!booted && <Boot key="boot" onDone={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <>
          {/* Top bar */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute left-0 right-0 top-0 z-40 flex items-center justify-between px-5 py-2 text-[11px] text-white/60"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-[0.3em] text-gradient-brand">DESIOS</span>
              <span className="text-white/30">•</span>
              <span>{APPS.find((a) => a.id === activeAppId)?.name ?? "Desktop"}</span>
            </div>
            <div className="glass flex items-center gap-1 rounded-full px-1 py-1">
              {workspaces.map((w, i) => (
                <button
                  key={w}
                  onClick={() => setWorkspace(i)}
                  className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-widest transition ${i === workspace ? "text-black" : "text-white/60 hover:text-white"}`}
                  style={i === workspace ? { background: "linear-gradient(135deg, #00E5FF, #7B61FF)" } : undefined}
                >
                  {w}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[var(--desios-mint)]" /> Neural-core online</span>
            </div>
          </motion.div>

          <Widgets />

          {/* Windows */}
          <AnimatePresence>
            {windows.map((w) => {
              const app = APPS.find((a) => a.id === w.appId)!;
              const Icon = app.icon;
              return (
                <Window
                  key={w.id}
                  win={w}
                  title={app.name}
                  accent={app.accent}
                  icon={<Icon className="h-4 w-4" />}
                  onClose={() => setWindows((ws) => ws.filter((x) => x.id !== w.id))}
                  onMinimize={() => setWindows((ws) => ws.map((x) => x.id === w.id ? { ...x, minimized: !x.minimized } : x))}
                  onMaximize={() => setWindows((ws) => ws.map((x) => x.id === w.id ? { ...x, maximized: !x.maximized } : x))}
                  onFocus={() => focusWin(w.id)}
                  onMove={(x, y) => setWindows((ws) => ws.map((p) => p.id === w.id ? { ...p, x, y } : p))}
                  onResize={(width, height) => setWindows((ws) => ws.map((p) => p.id === w.id ? { ...p, w: width, h: height } : p))}
                >
                  {renderApp(w.appId)}
                </Window>
              );
            })}
          </AnimatePresence>

          <CommandCenter
            open={cmdOpen}
            apps={APPS}
            onClose={() => setCmdOpen(false)}
            onLaunch={launch}
          />
          <NotificationCenter open={notifOpen} onClose={() => setNotifOpen(false)} />
          <Assistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />

          <Taskbar
            apps={APPS}
            openIds={windows.map((w) => w.appId).concat(assistantOpen ? ["assistant"] : [])}
            activeId={activeAppId}
            onLaunch={launch}
            onOpenCommand={() => setCmdOpen(true)}
            onOpenNotifications={() => setNotifOpen((o) => !o)}
          />

          {/* Floating DESI orb */}
          {!assistantOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              onClick={() => setAssistantOpen(true)}
              className="fixed bottom-28 right-6 z-[55] flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                background: "linear-gradient(135deg, #00E5FF, #7B61FF)",
                boxShadow: "0 0 30px rgba(0,229,255,0.6), 0 0 60px rgba(123,97,255,0.4)",
                animation: "desios-float 4s ease-in-out infinite",
              }}
              aria-label="Open DESI assistant"
            >
              <Sparkles className="h-6 w-6 text-black" />
            </motion.button>
          )}
        </>
      )}
    </div>
  );
}