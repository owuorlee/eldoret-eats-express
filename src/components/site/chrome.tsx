import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, MapPin, CalendarDays, ShoppingBag, X, Menu as MenuIcon, MessageCircle } from "lucide-react";
import { site, hours, dayNames } from "@/content/site";
import { openStatus, fmt } from "@/lib/hours";
import { btn } from "./ui";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/menu", label: "Menu" },
  { to: "/story", label: "Our Story" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Visit" },
] as const;

export const track = (event: string) => {
  // Analytics hook — wired to a provider in a later phase.
  if (typeof window !== "undefined") (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event });
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

export function OpenStatus({ className }: { className?: string }) {
  const [s, setS] = useState<ReturnType<typeof openStatus> | null>(null);
  useEffect(() => {
    setS(openStatus());
    const t = setInterval(() => setS(openStatus()), 60000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium", className)} aria-live="polite">
      <span className={cn("h-2 w-2 rounded-full", s?.open ? "bg-success" : "bg-destructive")} />
      {s?.label ?? "Checking hours…"}
    </span>
  );
}

function Announcement() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(localStorage.getItem("ann") !== site.announcement.id), []);
  if (!show) return null;
  return (
    <div className="bg-ink text-ink-foreground text-sm">
      <div className="container-x flex items-center gap-3 py-2">
        <p className="flex-1 text-center">{site.announcement.text}</p>
        <button aria-label="Dismiss announcement" onClick={() => { localStorage.setItem("ann", site.announcement.id); setShow(false); }}>
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Announcement />
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="container-x flex h-16 items-center gap-4">
          <Link to="/" className="font-display text-xl font-semibold leading-none">
            Eldoret<span className="text-primary">.</span>
            <span className="block text-[0.6rem] font-sans tracking-[0.3em] uppercase text-muted-foreground">Restaurant</span>
          </Link>
          <nav className="ml-6 hidden gap-6 md:flex" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-sm font-medium hover:text-primary" activeProps={{ className: "text-primary" }}>{n.label}</Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/reserve" onClick={() => track("reserve_click")} className={btn({ variant: "outline", size: "sm" })}>Reserve</Link>
            <Link to="/order" onClick={() => track("order_click")} className={btn({ size: "sm" })}>Order</Link>
            <button className="md:hidden p-2" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t md:hidden" aria-label="Mobile">
            <div className="container-x flex flex-col py-3">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 font-display text-2xl">{n.label}</Link>
              ))}
              <OpenStatus className="py-3" />
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export function MobileBar() {
  const items = [
    { href: `tel:${site.phone.replace(/\s/g, "")}`, label: "Call", icon: Phone, ev: "call_click" },
    { href: mapsUrl, label: "Directions", icon: MapPin, ev: "directions_click" },
  ];
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t bg-background md:hidden pb-[env(safe-area-inset-bottom)]">
      {items.map((i) => (
        <a key={i.label} href={i.href} onClick={() => track(i.ev)} className="flex flex-col items-center gap-1 py-2.5 text-xs font-medium">
          <i.icon className="h-5 w-5" />{i.label}
        </a>
      ))}
      <Link to="/reserve" onClick={() => track("reserve_click")} className="flex flex-col items-center gap-1 py-2.5 text-xs font-medium">
        <CalendarDays className="h-5 w-5" />Reserve
      </Link>
      <Link to="/order" onClick={() => track("order_click")} className="flex flex-col items-center gap-1 bg-primary py-2.5 text-xs font-semibold text-primary-foreground">
        <ShoppingBag className="h-5 w-5" />Order
      </Link>
    </nav>
  );
}

export function WhatsApp() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Eldoret Restaurant, ")}`}
      target="_blank" rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => track("whatsapp_click")}
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success text-primary-foreground shadow-card md:bottom-6"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function HoursList() {
  return (
    <ul className="space-y-1 text-sm">
      {[1, 2, 3, 4, 5, 6, 0].map((d) => {
        const h = hours[d];
        return (
          <li key={d} className="flex justify-between gap-6">
            <span>{dayNames[d]}</span>
            <span className="tabular-nums">{h ? `${fmt(h.open)} – ${fmt(h.close)}` : "Closed"}</span>
          </li>
        );
      })}
      <li className="pt-2 text-xs opacity-70">Kitchen takes last orders 30–60 min before closing.</li>
    </ul>
  );
}

export function Footer() {
  const [done, setDone] = useState(false);
  return (
    <footer className="bg-ink text-ink-foreground pb-24 md:pb-0">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl">Eldoret<span className="text-accent">.</span></p>
          <address className="mt-4 not-italic text-sm opacity-80">{site.address}</address>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-2 block text-sm underline-offset-4 hover:underline">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="block text-sm underline-offset-4 hover:underline">{site.email}</a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-accent hover:underline">Open in Google Maps →</a>
        </div>
        <div>
          <p className="eyebrow text-accent">Hours</p>
          <div className="mt-4 opacity-90"><HoursList /></div>
        </div>
        <div>
          <p className="eyebrow text-accent">Follow</p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.socials.map((s) => <li key={s.name}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{s.name}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-accent">Newsletter</p>
          <p className="mt-4 text-sm opacity-80">Feast nights and new dishes, once a month.</p>
          {done ? <p className="mt-4 text-sm text-accent">Asante! You're on the list.</p> : (
            <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
              <label htmlFor="nl" className="sr-only">Email</label>
              <input id="nl" type="email" required placeholder="you@email.com" className="min-w-0 flex-1 rounded-full bg-ink-foreground/10 px-4 text-sm placeholder:text-ink-foreground/50" />
              <button className={btn({ variant: "accent", size: "sm" })}>Join</button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-ink-foreground/15">
        <div className="container-x flex flex-wrap justify-between gap-3 py-6 text-xs opacity-70">
          <p>© {new Date().getFullYear()} {site.name}. Payments: {site.payments.join(" · ")}</p>
          <p className="flex gap-4"><span>Privacy Policy</span><span>Terms</span></p>
        </div>
      </div>
    </footer>
  );
}

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(!localStorage.getItem("cookies")), []);
  if (!show) return null;
  const set = (v: string) => { localStorage.setItem("cookies", v); setShow(false); };
  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-3 bottom-20 z-50 rounded-xl border bg-card p-4 shadow-card md:bottom-6 md:left-6 md:right-auto md:max-w-sm">
      <p className="text-sm">We use a few cookies to see which dishes people look at most. Nothing creepy.</p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => set("yes")} className={btn({ size: "sm" })}>Accept</button>
        <button onClick={() => set("no")} className={btn({ variant: "outline", size: "sm" })}>Decline</button>
      </div>
    </div>
  );
}
