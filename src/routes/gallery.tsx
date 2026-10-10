import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { gallery, images } from "@/content/site";
import { Img, PageHero } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Eldoret Restaurant" },
      { name: "description", content: "Photos of our nyama choma, mursik, dining room and group feasts in Eldoret." },
      { property: "og:title", content: "Gallery — Eldoret Restaurant" },
      { property: "og:description", content: "Food, interior and events at Eldoret Restaurant." },
    ],
  }),
  component: Gallery,
});

const tags = ["all", "food", "interior", "events"] as const;

function Gallery() {
  const [tag, setTag] = useState<(typeof tags)[number]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const list = gallery.filter((g) => tag === "all" || g.tag === tag);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <>
      <PageHero eyebrow="Gallery" title="A look around" />
      <div className="container-x flex gap-2 pb-6" role="group" aria-label="Filter photos">
        {tags.map((t) => (
          <button key={t} aria-pressed={tag === t} onClick={() => setTag(t)}
            className={cn("rounded-full border px-4 py-1.5 text-sm font-semibold capitalize", tag === t && "border-primary bg-primary text-primary-foreground")}>{t}</button>
        ))}
      </div>
      <div className="container-x grid grid-cols-2 gap-3 pb-20 md:grid-cols-3">
        {list.map((g, i) => (
          <button key={i} onClick={() => setOpen(i)} className="aspect-square overflow-hidden rounded-xl" aria-label={`Open photo: ${images[g.key].label}`}>
            <Img img={images[g.key]} alt={images[g.key].label} className="transition-transform hover:scale-105" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4" onClick={() => setOpen(null)}>
          <button aria-label="Close" className="absolute right-4 top-4 text-ink-foreground"><X className="h-8 w-8" /></button>
          <img src={images[list[open].key].src} alt={images[list[open].key].label} className="max-h-full max-w-full rounded-lg" />
        </div>
      )}
    </>
  );
}
