# Eldoret Eats Express

# Project: website for Eldoret Restaurant

## Restaurant details
- Name: Eldoret Restaurant
- Concept and cuisines: Nyama Choma, Mursik, Tea and Mandazi, etc add any other traditional Kalenjin cuisines
- Price level and atmosphere: [e.g. "mid-range, warm, lively, good for groups"]
- Address, phone, email, WhatsApp number: leave default
- Opening hours (per day, plus kitchen closing time): brainstorm
- Services offered: [dine-in / takeaway / delivery / catering / private events]
- Currency and payment methods: [e.g. cards, mobile money, cash on pickup] Kenya Shillings
- Social links and review profiles: [LINKS]
- Brand: [logo, colours, fonts, or write "propose a direction"] Brainstorm
- Languages: [e.g. English only]

## Goal
Build a production-quality, mobile-first website. It has three jobs, in this
order: make visitors hungry, tell them where and when they can eat, and let
them reserve or order in as few taps as possible. Most visitors are on a phone
and deciding where to eat right now, so every design choice should serve speed
and clarity on a small screen.


## Design direction
- Photography-led and restrained: large food and atmosphere images, generous
  whitespace, confident typography, subtle scroll animations. It should feel
  like this specific restaurant, not a template.
- Write real, specific copy for this restaurant based on the details above.
  No lorem ipsum and no generic lines like "delicious food, great service".
- Use clearly labelled image placeholders (e.g. "HERO: dining room at full
  service") so I can swap in real photos, and keep all text, hours, and image
  paths in one central content file.(Use african images specifically kenyan)
- Create a small design system first (colours, type scale, buttons, cards)
  and reuse it everywhere.

## Elements on every page
- Sticky header: logo, nav, and two always-visible buttons, "Reserve" and
  "Order".
- Mobile bottom bar: Call, Directions, Reserve, Order.
- Live "Open now / Closes at X / Opens at Y" status calculated from the hours.
- Dismissible announcement bar for holiday hours or specials.
- Footer: address, hours, phone, map link, socials, newsletter signup, legal
  links.
- WhatsApp click-to-chat button.

## Pages
1. Home: full-screen hero (photo or muted video) with tagline and both CTAs,
   signature dishes, short story teaser, today's specials, guest reviews with
   ratings, press logos, gallery strip, location with map and hours,
   newsletter signup.
2. Menu: HTML, never a PDF. Sticky category tabs (starters, mains, desserts,
   drinks, kids, specials), dish photo, description, price, dietary tags
   (vegetarian, vegan, gluten-free, halal, spicy), allergen info, dietary
   filters, search, "chef's pick" and "sold out" badges, print-friendly view,
   allergen disclaimer.
3. Reservations: date, time, party size, name, phone, email, occasion,
   seating preference, special requests. Offer only time slots inside opening
   hours. Send parties above [8] to the private dining form. Show a "what to
   expect" block (cancellation policy, dress code, parking, how long tables
   are held) and send a confirmation email with an add-to-calendar link.
4. Our Story: founder and chef profiles, team, and a specific sourcing
   section naming suppliers, farms, and methods.
5. Gallery: filterable (food, interior, events) with lightbox.
6. Private Dining and Events: spaces with capacity, sample set menus, inquiry
   form (date, guests, budget, event type), plus upcoming events listing.
7. Catering: packages and inquiry form.
8. Gift Cards: choose amount, add a message, purchase, email delivery.
9. Contact and Location: embedded map, directions, parking, public transport,
   accessibility info, click-to-call, contact form.
10. FAQ, Careers (open roles with application form), Privacy Policy, Terms.

## Online ordering
- Pickup or delivery toggle, with delivery area and minimum order check.
- Add to cart from the menu, with modifiers (size, extras, spice level) and
  notes.
- "Pairs well with" suggestions in the cart.
- Order now or schedule for later, limited to opening hours.
- Checkout with the payment methods listed above. Ask me before choosing a
  payment provider.
- Order confirmation page and email, with a simple status tracker (received,
  preparing, ready, out for delivery).

## Admin dashboard (login required, admin role only)
- Menu manager: add, edit, reorder, hide items; mark sold out; set specials.
- Reservations: list and calendar views; confirm, decline, or cancel.
- Orders: live queue with status updates.
- Inquiries: private dining, catering, contact, and job applications.
- Site settings: opening hours, special closures, announcement bar, gallery.
- Newsletter subscriber list with CSV export.

## Backend
Use Lovable Cloud for the database, auth, storage, and emails. Enable
row-level security on every table: the public can create reservations,
orders, and inquiries, but only admins can read or change them. Validate all
form input and add basic spam protection.

## Quality bar
- Fast: optimised, lazy-loaded images; no layout shift.
- Accessible: WCAG AA contrast, keyboard navigation, alt text, labelled forms.
- SEO: unique title and meta description per page, Open Graph tags, sitemap,
  and Restaurant and Menu structured data (JSON-LD) including address, hours,
  price range, and cuisine.
- Cookie consent banner and analytics events on Reserve, Order, and Call
  clicks.
- Friendly empty, loading, error, and 404 states.

## Build order
Build Phase 1 only, then stop, summarise what you built, and wait for me to
say "next phase". Do not change finished phases unless I ask.
- Phase 1: design system, global elements, Home, Menu, Our Story, Gallery,
  Contact (static content from the central content file). Basically the homepage
- Phase 2: database, admin login, menu manager, site settings; connect Menu
  and hours to the database.
- Phase 3: reservations, private dining, catering, contact, careers, and
  newsletter forms, with emails and admin views.
- Phase 4: online ordering and payments.
- Phase 5: gift cards, reviews, events listing, FAQ, SEO and accessibility
  pass.
- Phase 6 (optional): an AI menu assistant chat that answers "what should I
  order?" using only the menu data, including dietary and allergen questions.
Lets begin with phase 1

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a8381f17-1ade-4834-8448-43690b84c950).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
