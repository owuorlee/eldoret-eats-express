import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { site, images, menu, specialsToday, reviews, press, story, gallery } from "@/content/site";
import { btn, Img, SectionHead, ksh } from "@/components/site/ui";
import { OpenStatus, HoursList, mapsUrl, track } from "@/components/site/chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eldoret Restaurant — Nyama Choma, Mursik & Kalenjin Cooking" },
      { name: "description", content: "Charcoal-roasted goat, smoked-gourd mursik, chai and mandazi on Uganda Road, Eldoret. Reserve or order in seconds." },
      { property: "og:title", content: "Eldoret Restaurant — The Rift Valley table" },
      { property: "og:description", content: "Nyama choma, mursik and Kalenjin home cooking in Eldoret, Kenya." },
    ],
  }),
  component: Home,
});

function Home() {
  const signatures = menu.filter((m) => m.signature);
  const specials = menu.filter((m) => specialsToday.includes(m.id));
  return (
    <>
      <section className="relative h-[calc(100svh-4rem)] min-h-[520px] overflow-hidden bg-ink">
        <Img img={images.hero} alt="Charcoal-roasted goat ribs with ugali and kachumbari" eager />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="absolute inset-x-0 bottom-0 container-x pb-24 md:pb-20 text-ink-foreground">
          <OpenStatus className="rounded-full bg-ink/60 px-3 py-1 backdrop-blur" />
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] md:text-7xl">{site.tagline}</h1>
          <p className="mt-5 max-w-xl text-lg opacity-90">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/reserve" onClick={() => track("reserve_click")} className={btn({ size: "lg" })}>Reserve a table</Link>
            <Link to="/order" onClick={() => track("order_click")} className={btn({ variant: "ghostLight", size: "lg" })}>Order for pickup</Link>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow="Signature" title="What Eldoret comes here for" />
        <div className="grid gap-6 md:grid-cols-3">
          {signatures.map((d) => (
            <article key={d.id} className="reveal group overflow-hidden rounded-xl bg-card shadow-card">
              <div className="aspect-[4/3] overflow-hidden"><Img img={images[d.image!]} alt={d.name} className="transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold">{d.name}</h3>
                  <span className="font-semibold text-primary">{ksh(d.price)}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{d.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container-x grid items-center gap-10 py-20 md:grid-cols-2">
          <div className="reveal aspect-[4/3] overflow-hidden rounded-xl"><Img img={images.interior} alt="Guests sharing dinner in the dining room" /></div>
          <div className="reveal">
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Cooked by the woman who fed the champions</h2>
            <p className="mt-5 text-lg text-muted-foreground">{story.teaser}</p>
            <Link to="/story" className={btn({ variant: "outline", className: "mt-8" })}>Meet the family</Link>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow="Today" title="Off the fire today" />
        <ul className="divide-y border-y">
          {specials.map((s) => (
            <li key={s.id} className="reveal flex items-baseline justify-between gap-6 py-5">
              <div><h3 className="text-xl font-semibold">{s.name}</h3><p className="text-sm text-muted-foreground">{s.description}</p></div>
              <span className="shrink-0 font-semibold">{ksh(s.price)}</span>
            </li>
          ))}
        </ul>
        <Link to="/menu" className={btn({ variant: "outline", className: "mt-8" })}>See the full menu</Link>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="container-x py-20">
          <p className="eyebrow text-accent">Guests</p>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="reveal">
                <div className="flex gap-0.5 text-accent" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={i < r.rating ? "h-4 w-4 fill-current" : "h-4 w-4 opacity-30"} />)}
                </div>
                <blockquote className="mt-4 font-display text-xl leading-snug">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm opacity-70">{r.name} · {r.source}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-ink-foreground/15 pt-8">
            <span className="text-xs uppercase tracking-[0.2em] opacity-60">As featured in</span>
            {press.map((p) => <span key={p} className="font-display text-xl opacity-70">{p}</span>)}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x"><SectionHead eyebrow="Gallery" title="Smoke, gourds and good company" /></div>
        <div className="flex snap-x gap-4 overflow-x-auto px-5 pb-4">
          {gallery.map((g, i) => (
            <div key={i} className="aspect-[3/4] w-64 shrink-0 snap-start overflow-hidden rounded-xl md:w-80">
              <Img img={images[g.key]} alt={images[g.key].label} />
            </div>
          ))}
        </div>
        <div className="container-x"><Link to="/gallery" className={btn({ variant: "outline", className: "mt-6" })}>Open the gallery</Link></div>
      </section>

      <section className="bg-secondary">
        <div className="container-x grid gap-10 py-20 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="Find us" title="Uganda Road, opposite Zion Mall" />
            <OpenStatus />
            <div className="mt-6 max-w-sm"><HoursList /></div>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={btn({ className: "mt-8" })}>Get directions</a>
          </div>
          <div className="aspect-square overflow-hidden rounded-xl md:aspect-auto">
            <iframe title="Map to Eldoret Restaurant" loading="lazy" className="h-full min-h-80 w-full border-0"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`} />
          </div>
        </div>
      </section>
    </>
  );
}
