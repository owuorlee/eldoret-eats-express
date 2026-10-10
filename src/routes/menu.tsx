import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Printer } from "lucide-react";
import { menu, categories, images, type Diet } from "@/content/site";
import { Img, PageHero, btn, ksh } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Eldoret Restaurant | Nyama Choma, Kimiet, Mursik" },
      { name: "description", content: "Full menu with prices in KSh: goat and beef nyama choma, kienyeji chicken, kimiet, mursik, chai and mandazi. Dietary filters and allergens." },
      { property: "og:title", content: "The Eldoret Restaurant menu" },
      { property: "og:description", content: "Charcoal-roasted meats, Kalenjin staples and smoked-gourd mursik." },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "Menu", name: "Eldoret Restaurant Menu",
      hasMenuSection: categories.map((c) => ({ "@type": "MenuSection", name: c.label,
        hasMenuItem: menu.filter((m) => m.category === c.id).map((m) => ({ "@type": "MenuItem", name: m.name, description: m.description, offers: { "@type": "Offer", price: m.price, priceCurrency: "KES" } })) })),
    }) }],
  }),
  component: MenuPage,
});

const diets: Diet[] = ["vegetarian", "vegan", "gluten-free", "halal", "spicy"];

function MenuPage() {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<Diet[]>([]);
  const items = useMemo(() => menu.filter((m) =>
    (!q || `${m.name} ${m.description}`.toLowerCase().includes(q.toLowerCase())) &&
    filters.every((f) => m.diet.includes(f))), [q, filters]);

  return (
    <>
      <PageHero eyebrow="Menu" title="From the fire, the gourd and the pot" intro="Prices in Kenya Shillings, VAT included. Meat is weighed raw; ask us to scale any choma order for your group." />
      <div className="sticky top-16 z-30 border-y bg-background/95 backdrop-blur no-print">
        <div className="container-x flex gap-5 overflow-x-auto py-3 text-sm font-semibold">
          {categories.map((c) => <a key={c.id} href={`#${c.id}`} className="shrink-0 hover:text-primary">{c.label}</a>)}
        </div>
      </div>
      <div className="container-x py-6 no-print">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search the menu</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: goat, chai, millet…" className="h-11 w-full rounded-full border bg-card pl-11 pr-4" />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Dietary filters">
            {diets.map((d) => {
              const on = filters.includes(d);
              return <button key={d} aria-pressed={on} onClick={() => setFilters(on ? filters.filter((x) => x !== d) : [...filters, d])}
                className={cn("rounded-full border px-3 py-1.5 text-xs font-semibold capitalize", on && "border-primary bg-primary text-primary-foreground")}>{d}</button>;
            })}
          </div>
          <button onClick={() => window.print()} className={btn({ variant: "outline", size: "sm" })}><Printer className="h-4 w-4" />Print</button>
        </div>
      </div>

      <div className="container-x pb-20">
        {items.length === 0 && <p className="py-16 text-center text-muted-foreground">Nothing matches that yet — try clearing a filter.</p>}
        {categories.map((c) => {
          const list = items.filter((m) => m.category === c.id);
          if (!list.length) return null;
          return (
            <section key={c.id} id={c.id} className="scroll-mt-32 pt-10">
              <h2 className="text-3xl font-semibold">{c.label}</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {list.map((m) => (
                  <article key={m.id} className={cn("flex gap-4 rounded-xl bg-card p-4 shadow-card", m.soldOut && "opacity-60")}>
                    {m.image && <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg"><Img img={images[m.image]} alt={m.name} /></div>}
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-lg font-semibold">{m.name}</h3>
                        <span className="shrink-0 font-semibold text-primary">{ksh(m.price)}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {m.chefsPick && <span className="rounded bg-accent px-2 py-0.5 text-[0.7rem] font-bold">Chef's pick</span>}
                        {m.soldOut && <span className="rounded bg-destructive px-2 py-0.5 text-[0.7rem] font-bold text-destructive-foreground">Sold out</span>}
                        {m.diet.map((d) => <span key={d} className="rounded border px-2 py-0.5 text-[0.7rem] capitalize">{d}</span>)}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{m.description}</p>
                      {m.allergens.length > 0 && <p className="mt-1 text-xs">Contains: {m.allergens.join(", ")}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
        <p className="mt-12 rounded-xl border p-5 text-sm text-muted-foreground">
          <strong className="text-foreground">Allergens:</strong> our kitchen handles milk, gluten, peanuts, fish and eggs. We cook on shared grills and cannot guarantee any dish is free of traces. Tell your server about allergies before ordering.
        </p>
      </div>
    </>
  );
}
