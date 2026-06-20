export type AppId =
  | "home"
  | "explorer"
  | "browser"
  | "notes"
  | "terminal"
  | "assistant"
  | "settings"
  | "store"
  | "media"
  | "monitor";

export interface AppDef {
  id: AppId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  defaultSize?: { w: number; h: number };
}

export interface WindowState {
  id: string;
  appId: AppId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}