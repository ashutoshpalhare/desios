import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Mic, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Msg { role: "user" | "ai"; text: string }

const seed: Msg[] = [
  { role: "ai", text: "Hi, I'm DESI. I've prepped your workspace for today. Want a summary?" },
];

const aiReplies = [
  "Opening that for you now.",
  "Analyzing your workspace context…",
  "Done. I created a new project and synced it to the cloud.",
  "Here's a quick summary: 3 deep-work blocks, 12 emails handled, 2 PRs reviewed.",
  "Switching to Focus mode and dimming the ambient lights.",
];

export function Assistant({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [...m, { role: "ai", text: aiReplies[Math.floor(Math.random() * aiReplies.length)] }]);
    }, 900 + Math.random() * 600);
  };

  const quick = ["Summarize my day", "Open Notes", "Enable Focus mode", "Show system health"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className="glass-strong fixed right-6 top-6 bottom-28 z-[75] flex w-[380px] flex-col overflow-hidden rounded-3xl"
          style={{ boxShadow: "0 0 60px rgba(0,229,255,0.25), 0 0 0 1px rgba(255,255,255,0.08) inset" }}
        >
          <div className="flex items-center gap-3 border-b border-white/10 p-4">
            <div className="relative">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #00E5FF, #7B61FF)",
                  animation: "desios-pulse-glow 2.5s ease-in-out infinite",
                }}
              >
                <Sparkles className="h-5 w-5 text-black" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0b1224] bg-[var(--desios-mint)]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">DESI</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">Neural assistant • online</div>
            </div>
            <button onClick={onClose} className="ml-auto rounded-lg p-1.5 text-white/50 hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="desios-scrollbar flex-1 space-y-3 overflow-auto p-4">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm"
                  style={
                    m.role === "user"
                      ? { background: "rgba(255,255,255,0.08)", color: "white" }
                      : { background: "linear-gradient(135deg, rgba(0,229,255,0.18), rgba(123,97,255,0.14))", color: "white", border: "1px solid rgba(0,229,255,0.2)" }
                  }
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl bg-white/5 px-3 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      className="h-1.5 w-1.5 rounded-full bg-[var(--desios-cyan)]"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="mb-2 flex flex-wrap gap-1">
              {quick.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70 hover:bg-white/10"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <button type="button" className="text-white/50 hover:text-[var(--desios-cyan)]">
                <Mic className="h-4 w-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Talk to DESI…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg p-1.5"
                style={{ background: "linear-gradient(135deg, #00E5FF, #7B61FF)", color: "#070B14" }}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}