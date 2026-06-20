import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Boot({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("Initializing kernel");
  const stages = [
    "Initializing kernel",
    "Mounting neural drivers",
    "Calibrating DESI assistant",
    "Loading holographic shell",
    "Welcome to DESIOS",
  ];

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setProgress((p) => {
        const n = Math.min(100, p + 4 + Math.random() * 6);
        const newStage = Math.floor((n / 100) * stages.length);
        if (newStage !== i && stages[newStage]) {
          i = newStage;
          setStage(stages[newStage]);
        }
        if (n >= 100) {
          clearInterval(t);
          setTimeout(onDone, 700);
        }
        return n;
      });
    }, 140);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(20px)" }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "var(--desios-bg)" }}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: "var(--gradient-aurora)" }}
      />
      <div className="relative flex flex-col items-center gap-10">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative h-32 w-32">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #00E5FF, #7B61FF, #00FFA3, #00E5FF)",
                animation: "spin 4s linear infinite",
                filter: "blur(2px)",
              }}
            />
            <div
              className="absolute inset-2 rounded-full flex items-center justify-center"
              style={{ background: "var(--desios-bg)" }}
            >
              <span className="text-3xl font-bold tracking-[0.3em] text-gradient-brand">D</span>
            </div>
          </div>
        </motion.div>
        <div className="text-center">
          <h1 className="text-5xl font-light tracking-[0.4em] text-gradient-brand">DESIOS</h1>
          <p className="mt-3 text-xs tracking-[0.5em] text-white/40">
            THE INTELLIGENT DESKTOP
          </p>
        </div>
        <div className="w-72">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
              className="h-full"
              style={{
                background: "linear-gradient(90deg, #00E5FF, #7B61FF, #00FFA3)",
                boxShadow: "0 0 12px rgba(0,229,255,0.6)",
              }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[10px] tracking-widest text-white/40 uppercase">
            <span>{stage}</span>
            <span>{Math.floor(progress)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}