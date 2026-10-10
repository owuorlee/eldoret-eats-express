import { createFileRoute } from "@tanstack/react-router";
import { story, images } from "@/content/site";
import { Img, PageHero, SectionHead } from "@/components/site/ui";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Eldoret Restaurant" },
      { name: "description", content: "Founded by Mama Chepkoech Rotich in 2014. Meet our chefs and the Rift Valley farms that supply our goat, chicken, milk, tea and honey." },
      { property: "og:title", content: "Our Story — Eldoret Restaurant" },
      { property: "og:description", content: "The family, the fire and the farms behind Eldoret Restaurant." },
    ],
  }),
  component: Story,
});

function Story() {
  return (
    <>
      <PageHero eyebrow="Our story" title="Thirty years of feeding runners, one fire pit" intro={story.teaser} />
      <div className="container-x"><div className="aspect-[16/9] overflow-hidden rounded-xl"><Img img={images.interior} alt="Our dining room on a busy evening" eager /></div></div>
      <section className="container-x py-20">
        <SectionHead eyebrow="The people" title="Who's cooking" />
        <div className="grid gap-8 md:grid-cols-3">
          {story.people.map((p) => (
            <article key={p.name} className="reveal">
              <div className="flex aspect-[4/5] items-center justify-center rounded-xl bg-secondary p-6 text-center text-xs uppercase tracking-widest text-muted-foreground">PORTRAIT: {p.name}, {p.role}</div>
              <p className="eyebrow mt-5">{p.role}</p>
              <h3 className="mt-1 text-2xl font-semibold">{p.name}</h3>
              <p className="mt-2 text-muted-foreground">{p.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-secondary">
        <div className="container-x grid gap-12 py-20 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="Sourcing" title="Everything within a morning's drive">
              Meat is salted and roasted, nothing more. Mursik is fermented 3–5 days in sotet gourds smoked with cromwo (Senna didymobotrya) charcoal, the way Kalenjin families have done for generations.
            </SectionHead>
            <div className="aspect-square overflow-hidden rounded-xl"><Img img={images.mursik} alt="Mursik poured from a sotet gourd" /></div>
          </div>
          <ul className="divide-y self-center border-y">
            {story.suppliers.map((s) => (
              <li key={s.name} className="reveal py-5"><h3 className="text-xl font-semibold">{s.name}</h3><p className="text-muted-foreground">{s.what}</p></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
