import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Search, Star, FileText, Image as ImageIcon, Film, FolderOpen, Cloud,
  Plus, ArrowLeft, ArrowRight, RotateCw, Lock, Play, Pause, SkipBack, SkipForward,
  Volume2, Cpu, MemoryStick, HardDrive, Wifi, Activity, Sparkles, Download,
  Palette, Shield, Zap, Accessibility, Bot, MessageSquare, ChevronRight,
} from "lucide-react";

/* ---------------- HOME ---------------- */
export function HomeApp() {
  return (
    <div className="relative h-full overflow-hidden p-8">
      <div className="absolute inset-0" style={{ background: "radial-gradient(80% 60% at 20% 0%, rgba(0,229,255,0.15), transparent)" }} />
      <div className="relative">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">Welcome to</div>
        <h1 className="mt-2 text-6xl font-extralight tracking-tight">
          <span className="text-gradient-brand">DESIOS</span>
        </h1>
        <p className="mt-3 max-w-md text-sm text-white/60">
          A next-generation, AI-native desktop. Glide through windows, ask DESI anything, and let the OS adapt to you.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {[
            { t: "Ask DESI", d: "Smart command center for everything", c: "#00E5FF" },
            { t: "Smart Explorer", d: "Files that find themselves", c: "#7B61FF" },
            { t: "Live Widgets", d: "Drag, drop, configure", c: "#00FFA3" },
            { t: "Virtual Workspaces", d: "Work, Play, Create — one swipe away", c: "#00E5FF" },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="h-1 w-8 rounded-full" style={{ background: f.c, boxShadow: `0 0 12px ${f.c}` }} />
              <div className="mt-3 text-sm font-medium text-white">{f.t}</div>
              <div className="text-xs text-white/50">{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- EXPLORER ---------------- */
const sections = [
  { id: "documents", label: "Documents", icon: FileText, color: "#00E5FF" },
  { id: "projects", label: "Projects", icon: FolderOpen, color: "#7B61FF" },
  { id: "media", label: "Media", icon: ImageIcon, color: "#00FFA3" },
  { id: "downloads", label: "Downloads", icon: Download, color: "#00E5FF" },
  { id: "cloud", label: "Cloud", icon: Cloud, color: "#7B61FF" },
];
const files = [
  { name: "Roadmap-2035.md", type: "doc", size: "12 KB" },
  { name: "neural-render.mov", type: "video", size: "248 MB" },
  { name: "aurora-mockup.png", type: "image", size: "8.4 MB" },
  { name: "kernel.config", type: "doc", size: "2 KB" },
  { name: "team-meeting.wav", type: "audio", size: "32 MB" },
  { name: "design-system.fig", type: "doc", size: "44 MB" },
  { name: "wallpaper-04.jpg", type: "image", size: "4.1 MB" },
  { name: "intro.mp4", type: "video", size: "112 MB" },
];

export function ExplorerApp() {
  const [active, setActive] = useState("documents");
  return (
    <div className="flex h-full">
      <div className="w-48 shrink-0 border-r border-white/10 p-3">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
          <input placeholder="Search…" className="w-full rounded-lg border border-white/10 bg-white/5 py-1.5 pl-7 pr-2 text-xs text-white focus:outline-none" />
        </div>
        <div className="mt-4 space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition ${active === s.id ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"}`}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: s.color }} />
                {s.label}
              </button>
            );
          })}
        </div>
        <div className="mt-6 rounded-xl border border-white/10 p-3" style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(123,97,255,0.08))" }}>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/50">
            <Sparkles className="h-3 w-3" /> AI Group
          </div>
          <div className="mt-1 text-xs text-white/80">12 files about <span className="text-[var(--desios-cyan)]">Aurora launch</span></div>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-white/80 capitalize">{active}</div>
          <div className="text-[10px] text-white/40">{files.length} items</div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {files.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="group cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:bg-white/[0.06] hover:scale-[1.02]"
            >
              <div className="flex h-20 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(123,97,255,0.1))" }}>
                {f.type === "video" && <Film className="h-7 w-7 text-[var(--desios-violet)]" />}
                {f.type === "image" && <ImageIcon className="h-7 w-7 text-[var(--desios-mint)]" />}
                {f.type === "doc" && <FileText className="h-7 w-7 text-[var(--desios-cyan)]" />}
                {f.type === "audio" && <Volume2 className="h-7 w-7 text-[var(--desios-cyan)]" />}
              </div>
              <div className="mt-2 truncate text-xs text-white">{f.name}</div>
              <div className="text-[10px] text-white/40">{f.size}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- BROWSER ---------------- */
export function BrowserApp() {
  const [tabs, setTabs] = useState([
    { id: 1, title: "DESIOS — Home", url: "desios.os/home" },
    { id: 2, title: "Neural Lab", url: "neural.lab/research" },
    { id: 3, title: "Aurora Store", url: "store.desios.os" },
  ]);
  const [active, setActive] = useState(1);
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1 border-b border-white/10 px-2 pt-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`group flex items-center gap-2 rounded-t-lg px-3 py-2 text-xs transition ${active === t.id ? "bg-white/[0.08] text-white" : "text-white/50 hover:text-white"}`}
          >
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: active === t.id ? "#00E5FF" : "rgba(255,255,255,0.3)" }} />
            {t.title}
          </button>
        ))}
        <button onClick={() => { const id = Date.now(); setTabs([...tabs, { id, title: "New Tab", url: "" }]); setActive(id); }} className="ml-1 rounded p-1 text-white/40 hover:bg-white/10">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-2 border-b border-white/10 p-2">
        <ArrowLeft className="h-4 w-4 text-white/40" />
        <ArrowRight className="h-4 w-4 text-white/40" />
        <RotateCw className="h-4 w-4 text-white/40" />
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
          <Lock className="h-3 w-3 text-[var(--desios-mint)]" />
          <span className="text-xs text-white/80">{tabs.find((t) => t.id === active)?.url || "Search the web…"}</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-light text-gradient-brand">DESIOS Web</h2>
          <p className="mt-2 text-sm text-white/50">The browser that thinks ahead.</p>
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
            <Search className="ml-2 h-4 w-4 text-white/40" />
            <input placeholder="Ask the web…" className="flex-1 bg-transparent py-2 text-sm text-white placeholder:text-white/30 focus:outline-none" />
          </div>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {["GitHub", "Figma", "Linear", "Notion", "Docs", "Discord", "Vercel", "Arxiv"].map((s) => (
              <button key={s} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/80 hover:bg-white/[0.06]">
                <Star className="mx-auto mb-2 h-4 w-4 text-[var(--desios-cyan)]" />
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- NOTES ---------------- */
const initialNotes = [
  { id: 1, title: "DESIOS launch ideas", body: "Boot sequence should feel cinematic.\n\nDESI voice tuned warmer.\n\nDock animations match Mercury easing.", tag: "Work" },
  { id: 2, title: "Reading list", body: "• Designing Calm Tech\n• The Humane Interface\n• A Pattern Language", tag: "Personal" },
  { id: 3, title: "Aurora 2.0", body: "New particle engine.\nNeural cache.\nAI-native window manager.", tag: "Projects" },
];
export function NotesApp() {
  const [notes, setNotes] = useState(initialNotes);
  const [active, setActive] = useState(notes[0].id);
  const current = notes.find((n) => n.id === active)!;
  return (
    <div className="flex h-full">
      <div className="w-56 shrink-0 border-r border-white/10 p-3">
        <button
          onClick={() => { const n = { id: Date.now(), title: "Untitled", body: "", tag: "New" }; setNotes([n, ...notes]); setActive(n.id); }}
          className="mb-3 flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-xs"
          style={{ background: "linear-gradient(135deg, #00E5FF, #7B61FF)", color: "#070B14" }}
        >
          <Plus className="h-3 w-3" /> New note
        </button>
        <div className="space-y-1">
          {notes.map((n) => (
            <button key={n.id} onClick={() => setActive(n.id)} className={`block w-full rounded-lg px-2 py-2 text-left transition ${active === n.id ? "bg-white/10" : "hover:bg-white/5"}`}>
              <div className="truncate text-xs font-medium text-white">{n.title}</div>
              <div className="truncate text-[10px] text-white/40">{n.body || "No content"}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <input
          value={current.title}
          onChange={(e) => setNotes(notes.map((n) => n.id === active ? { ...n, title: e.target.value } : n))}
          className="border-b border-white/10 bg-transparent px-6 py-4 text-2xl font-light text-white focus:outline-none"
        />
        <textarea
          value={current.body}
          onChange={(e) => setNotes(notes.map((n) => n.id === active ? { ...n, body: e.target.value } : n))}
          className="desios-scrollbar flex-1 resize-none bg-transparent p-6 text-sm leading-relaxed text-white/85 focus:outline-none"
        />
      </div>
    </div>
  );
}

/* ---------------- TERMINAL ---------------- */
export function TerminalApp() {
  const [lines, setLines] = useState<string[]>([
    "DESIOS Neural Shell v2.0.35",
    "Type 'help' to list commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { containerRef.current?.scrollTo({ top: 99999 }); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const exec = (cmd: string) => {
    const out: string[] = [`> ${cmd}`];
    const c = cmd.trim().toLowerCase();
    if (c === "help") out.push("Available: help, status, system, ai, clear");
    else if (c === "status") out.push("● kernel: stable", "● neural-core: online", "● uplink: 1.2 Gb/s");
    else if (c === "system") out.push("CPU: 28% • MEM: 64% • GPU: 41% • TEMP: 42°C");
    else if (c === "ai") out.push("DESI: How can I help?", "  → 'open notes', 'focus mode', 'summarize today'");
    else if (c === "clear") return setLines([]);
    else if (c) out.push(`command not found: ${cmd}`);
    setLines((l) => [...l, ...out, ""]);
  };

  return (
    <div ref={containerRef} onClick={() => inputRef.current?.focus()} className="desios-scrollbar h-full overflow-auto bg-[#040810] p-4 font-mono text-xs text-[var(--desios-mint)]">
      <div className="mb-2 text-white/40">┌─[ desi@desios ~ ]</div>
      {lines.map((l, i) => (
        <div key={i} className={l.startsWith(">") ? "text-[var(--desios-cyan)]" : "text-white/80"}>{l || "\u00A0"}</div>
      ))}
      <form onSubmit={(e) => { e.preventDefault(); exec(input); setInput(""); }} className="flex items-center gap-2">
        <span className="text-[var(--desios-mint)]">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-white caret-[var(--desios-cyan)] focus:outline-none"
        />
      </form>
    </div>
  );
}

/* ---------------- SETTINGS ---------------- */
const settingsCats = [
  { icon: Palette, label: "Appearance", c: "#00E5FF" },
  { icon: Shield, label: "Privacy", c: "#7B61FF" },
  { icon: Zap, label: "Performance", c: "#00FFA3" },
  { icon: Accessibility, label: "Accessibility", c: "#00E5FF" },
  { icon: Bot, label: "AI Settings", c: "#7B61FF" },
];
export function SettingsApp() {
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Tell me how you'd like DESIOS to feel today." },
  ]);
  const [input, setInput] = useState("");
  return (
    <div className="flex h-full">
      <div className="w-52 shrink-0 border-r border-white/10 p-3">
        <div className="text-[10px] uppercase tracking-widest text-white/40">Categories</div>
        <div className="mt-3 space-y-1">
          {settingsCats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-white/70 hover:bg-white/5">
                <Icon className="h-3.5 w-3.5" style={{ color: s.c }} />
                {s.label}
                <ChevronRight className="ml-auto h-3 w-3 text-white/30" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
          <MessageSquare className="h-3 w-3" /> Conversational Settings
        </div>
        <h2 className="mt-2 text-2xl font-light text-white">Just tell DESIOS what you want.</h2>
        <p className="mt-1 text-xs text-white/50">Try: "Make the system darker", "Enable gaming mode", "Increase performance".</p>
        <div className="desios-scrollbar mt-4 flex-1 space-y-2 overflow-auto rounded-2xl border border-white/10 bg-white/[0.02] p-3">
          {chat.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm`} style={m.role === "user" ? { background: "rgba(255,255,255,0.08)", color: "white" } : { background: "linear-gradient(135deg, rgba(0,229,255,0.18), rgba(123,97,255,0.14))", color: "white" }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          setChat((c) => [...c, { role: "user", text: input }, { role: "ai", text: "Applying that change now…" }]);
          setInput("");
        }} className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tell DESIOS what to do…" className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none" />
          <button className="rounded-lg px-3 py-1 text-xs" style={{ background: "linear-gradient(135deg, #00E5FF, #7B61FF)", color: "#070B14" }}>Apply</button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- STORE ---------------- */
const storeApps = [
  { name: "Aurora Studio", cat: "Design", c: "#00E5FF", desc: "AI-native creative suite" },
  { name: "Helix Code", cat: "Developer", c: "#7B61FF", desc: "Neural pair programmer" },
  { name: "Cosmos", cat: "Research", c: "#00FFA3", desc: "Knowledge graph explorer" },
  { name: "Resonance", cat: "Audio", c: "#00E5FF", desc: "Spatial sound producer" },
  { name: "Lumen", cat: "Productivity", c: "#7B61FF", desc: "Calm focus environments" },
  { name: "Nimbus", cat: "Cloud", c: "#00FFA3", desc: "Distributed file sync" },
];
export function StoreApp() {
  return (
    <div className="desios-scrollbar h-full overflow-auto p-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40">DESIOS Store</div>
          <h2 className="mt-1 text-3xl font-light text-gradient-brand">Discover what's next</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-white/40" />
          <input placeholder="Search apps" className="bg-transparent text-xs text-white focus:outline-none w-32" />
        </div>
      </div>
      <div className="mb-6 flex gap-2 text-xs">
        {["Featured", "Productivity", "Creative", "Developer", "AI", "Games"].map((c, i) => (
          <button key={c} className={`rounded-full px-3 py-1.5 ${i === 0 ? "text-black" : "text-white/60 hover:text-white"}`} style={i === 0 ? { background: "linear-gradient(135deg, #00E5FF, #7B61FF)" } : { background: "rgba(255,255,255,0.05)" }}>{c}</button>
        ))}
      </div>
      <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 p-6" style={{ background: "linear-gradient(120deg, rgba(0,229,255,0.18), rgba(123,97,255,0.18))" }}>
        <div className="text-[10px] uppercase tracking-widest text-white/60">Featured</div>
        <h3 className="mt-2 text-2xl font-light text-white">Aurora Studio</h3>
        <p className="mt-1 max-w-md text-sm text-white/70">An AI-native creative suite that turns sketches into shipped products.</p>
        <button className="mt-4 rounded-lg bg-black/40 px-4 py-2 text-xs text-white hover:bg-black/60">Get</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {storeApps.map((a) => (
          <div key={a.name} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl" style={{ background: `linear-gradient(135deg, ${a.c}, ${a.c}40)`, boxShadow: `0 0 20px ${a.c}40` }} />
              <div>
                <div className="text-sm font-medium text-white">{a.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">{a.cat}</div>
              </div>
            </div>
            <p className="mt-3 text-xs text-white/60">{a.desc}</p>
            <button className="mt-3 w-full rounded-lg border border-white/10 py-1.5 text-xs text-white hover:bg-white/10">Install</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- MEDIA ---------------- */
const tracks = [
  { t: "Aurora Skies", a: "Nova Drift", d: "3:42" },
  { t: "Neural Bloom", a: "Holosynth", d: "4:11" },
  { t: "Velvet Static", a: "Mira Echo", d: "2:58" },
  { t: "Halocline", a: "Subwave", d: "5:24" },
];
export function MediaApp() {
  const [playing, setPlaying] = useState(true);
  const [active, setActive] = useState(0);
  return (
    <div className="flex h-full">
      <div className="flex w-2/5 flex-col items-center justify-center p-6" style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(123,97,255,0.18))" }}>
        <motion.div
          animate={{ rotate: playing ? 360 : 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative h-44 w-44 rounded-full"
          style={{ background: "conic-gradient(from 0deg, #00E5FF, #7B61FF, #00FFA3, #00E5FF)", boxShadow: "0 0 60px rgba(0,229,255,0.4)" }}
        >
          <div className="absolute inset-3 rounded-full" style={{ background: "#0b1224" }} />
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
        </motion.div>
        <div className="mt-6 text-center">
          <div className="text-lg font-medium text-white">{tracks[active].t}</div>
          <div className="text-xs text-white/60">{tracks[active].a}</div>
        </div>
        <div className="mt-4 flex w-full items-end justify-center gap-1">
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: playing ? [4, 6 + Math.random() * 20, 4] : 4 }}
              transition={{ duration: 0.6 + Math.random() * 0.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 rounded-full"
              style={{ background: `linear-gradient(180deg, #00E5FF, #7B61FF)` }}
            />
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4">
          <SkipBack className="h-4 w-4 cursor-pointer text-white/70" onClick={() => setActive((a) => Math.max(0, a - 1))} />
          <button onClick={() => setPlaying(!playing)} className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, #00E5FF, #7B61FF)", boxShadow: "0 0 24px rgba(0,229,255,0.6)" }}>
            {playing ? <Pause className="h-5 w-5 text-black" /> : <Play className="h-5 w-5 text-black" />}
          </button>
          <SkipForward className="h-4 w-4 cursor-pointer text-white/70" onClick={() => setActive((a) => Math.min(tracks.length - 1, a + 1))} />
        </div>
      </div>
      <div className="desios-scrollbar flex-1 overflow-auto p-5">
        <div className="mb-3 text-[10px] uppercase tracking-widest text-white/40">Now Playing • Playlist</div>
        <div className="space-y-1">
          {tracks.map((t, i) => (
            <button key={t.t} onClick={() => setActive(i)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs ${active === i ? "bg-white/10" : "hover:bg-white/5"}`}>
              <span className="w-5 text-white/40">{i + 1}</span>
              <div className="flex-1">
                <div className="text-white">{t.t}</div>
                <div className="text-white/40">{t.a}</div>
              </div>
              <span className="text-white/40">{t.d}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- SYSTEM MONITOR ---------------- */
function SparkLine({ color }: { color: string }) {
  const [pts, setPts] = useState<number[]>(() => Array.from({ length: 30 }, () => Math.random() * 80 + 10));
  useEffect(() => {
    const t = setInterval(() => setPts((p) => [...p.slice(1), Math.random() * 80 + 10]), 700);
    return () => clearInterval(t);
  }, []);
  const path = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 100} ${100 - v}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-16 w-full">
      <path d={`${path} L 100 100 L 0 100 Z`} fill={`url(#g-${color.replace("#", "")})`} opacity="0.3" />
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
      <defs>
        <linearGradient id={`g-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function MonitorApp() {
  const stats = [
    { label: "CPU", icon: Cpu, v: "28%", color: "#00E5FF" },
    { label: "Memory", icon: MemoryStick, v: "10.2/16 GB", color: "#7B61FF" },
    { label: "GPU", icon: Activity, v: "41%", color: "#00FFA3" },
    { label: "Storage", icon: HardDrive, v: "412/1 TB", color: "#00E5FF" },
    { label: "Network", icon: Wifi, v: "1.2 Gb/s", color: "#7B61FF" },
    { label: "Neural", icon: Sparkles, v: "Optimal", color: "#00FFA3" },
  ];
  return (
    <div className="h-full p-5">
      <div className="text-[10px] uppercase tracking-widest text-white/40">System Monitor</div>
      <h2 className="mt-1 text-2xl font-light text-white">All systems nominal</h2>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Icon className="h-3.5 w-3.5" style={{ color: s.color }} />
                  {s.label}
                </div>
                <span className="text-xs text-white">{s.v}</span>
              </div>
              <div className="mt-2"><SparkLine color={s.color} /></div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="text-[10px] uppercase tracking-widest text-white/40">Top processes</div>
        <div className="mt-2 space-y-1.5">
          {[
            { n: "desi.core", c: 18, m: 412 },
            { n: "aurora-render", c: 7, m: 980 },
            { n: "browser.engine", c: 4, m: 612 },
            { n: "notes.sync", c: 1, m: 88 },
          ].map((p) => (
            <div key={p.n} className="grid grid-cols-4 items-center text-xs text-white/70">
              <span className="text-white">{p.n}</span>
              <span>{p.c}% CPU</span>
              <span>{p.m} MB</span>
              <div className="h-1 rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: `${p.c * 3}%`, background: "linear-gradient(90deg, #00E5FF, #7B61FF)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}