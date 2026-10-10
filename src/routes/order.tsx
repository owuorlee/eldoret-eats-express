import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { PageHero, btn } from "@/components/site/ui";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Online — Eldoret Restaurant" },
      { name: "description", content: "Pickup and delivery from Eldoret Restaurant. Online ordering opens soon — call or WhatsApp your order now." },
      { property: "og:title", content: "Order from Eldoret Restaurant" },
      { property: "og:description", content: "Nyama choma for pickup or delivery in Eldoret." },
    ],
  }),
  component: () => (
    <div className="pb-20">
      <PageHero eyebrow="Order" title="Online ordering opens soon" intro="Call or WhatsApp your order and we'll have it ready for pickup. M-Pesa, card and cash accepted." />
      <div className="container-x flex flex-wrap gap-3">
        <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi, I'd like to order: ")}`} className={btn()}>Order on WhatsApp</a>
        <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={btn({ variant: "outline" })}>Call</a>
        <Link to="/menu" className={btn({ variant: "outline" })}>See the menu</Link>
      </div>
    </div>
  ),
});
