import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { PageHero, btn } from "@/components/site/ui";

export const Route = createFileRoute("/reserve")({
  head: () => ({
    meta: [
      { title: "Reserve a Table — Eldoret Restaurant" },
      { name: "description", content: "Book a table at Eldoret Restaurant. Online booking opens soon — call or WhatsApp us to reserve today." },
      { property: "og:title", content: "Reserve at Eldoret Restaurant" },
      { property: "og:description", content: "Book your table for nyama choma night." },
    ],
  }),
  component: () => (
    <div className="pb-20">
      <PageHero eyebrow="Reserve" title="Online booking is almost ready" intro="Until then, call or WhatsApp us and we'll hold your table." />
      <div className="container-x flex flex-wrap gap-3">
        <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={btn()}>Call {site.phone}</a>
        <a href={`https://wa.me/${site.whatsapp}`} className={btn({ variant: "outline" })}>WhatsApp</a>
        <Link to="/menu" className={btn({ variant: "outline" })}>Browse the menu</Link>
      </div>
    </div>
  ),
});
