import { createFileRoute } from "@tanstack/react-router";
import { Desios } from "@/components/desios/Desios";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DESIOS — The Intelligent Desktop of the Future" },
      { name: "description", content: "DESIOS is a next-generation AI-native operating system concept with a floating dock, smart command center, and built-in assistant." },
      { property: "og:title", content: "DESIOS — The Intelligent Desktop of the Future" },
      { property: "og:description", content: "Step into a futuristic AI-powered desktop experience." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Desios />;
}
