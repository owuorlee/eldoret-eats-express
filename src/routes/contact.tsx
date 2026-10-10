import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site, contactInfo } from "@/content/site";
import { PageHero, btn } from "@/components/site/ui";
import { HoursList, OpenStatus, mapsUrl, track } from "@/components/site/chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location — Eldoret Restaurant" },
      { name: "description", content: "Find us on Uganda Road opposite Zion Mall, Eldoret. Directions, parking, matatu routes, accessibility and opening hours." },
      { property: "og:title", content: "Visit Eldoret Restaurant" },
      { property: "og:description", content: "Directions, parking and hours for Eldoret Restaurant." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const field = "mt-1 w-full rounded-lg border bg-card px-4 py-3";
  return (
    <>
      <PageHero eyebrow="Visit" title="Come hungry" intro={site.address} />
      <div className="container-x grid gap-10 pb-20 md:grid-cols-2">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} onClick={() => track("call_click")} className={btn()}>Call {site.phone}</a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={btn({ variant: "outline" })}>Directions</a>
          </div>
          <OpenStatus />
          <div className="max-w-sm"><HoursList /></div>
          {Object.entries({ Directions: contactInfo.directions, Parking: contactInfo.parking, "Public transport": contactInfo.transport, Accessibility: contactInfo.accessibility }).map(([k, v]) => (
            <div key={k}><h2 className="text-xl font-semibold">{k}</h2><p className="mt-1 text-muted-foreground">{v}</p></div>
          ))}
        </div>
        <div className="space-y-8">
          <iframe title="Map to Eldoret Restaurant" loading="lazy" className="aspect-[4/3] w-full rounded-xl border-0"
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`} />
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            {sent ? <p className="mt-4 text-success">Asante — we'll reply within a day.</p> : (
              <form className="mt-4 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <label className="block text-sm font-medium">Name<input required maxLength={100} className={field} /></label>
                <label className="block text-sm font-medium">Email<input type="email" required maxLength={255} className={field} /></label>
                <label className="block text-sm font-medium">Message<textarea required maxLength={1000} rows={4} className={field} /></label>
                <button className={btn()}>Send</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
