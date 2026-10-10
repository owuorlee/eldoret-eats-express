import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { images } from "@/content/site";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:brightness-110",
        accent: "bg-accent text-accent-foreground hover:brightness-105",
        outline: "border border-foreground/25 text-foreground hover:bg-foreground/5",
        ghostLight: "border border-ink-foreground/40 text-ink-foreground hover:bg-ink-foreground/10",
      },
      size: { sm: "h-9 px-4 text-sm", md: "h-11 px-6 text-sm", lg: "h-13 px-8 text-base py-3.5" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);
export type BtnProps = VariantProps<typeof btn>;

export function Img({ img, alt, className, eager }: { img: (typeof images)[keyof typeof images]; alt: string; className?: string; eager?: boolean }) {
  return (
    <img
      src={img.src}
      width={img.w}
      height={img.h}
      alt={alt}
      title={img.label}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}

export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold md:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-muted-foreground">{children}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="container-x pt-12 pb-8 md:pt-20">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
    </section>
  );
}

export const ksh = (n: number) => `KSh ${n.toLocaleString("en-KE")}`;
