import { hours, dayNames } from "@/content/site";

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
export const fmt = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "pm" : "am";
  const hh = h % 12 || 12;
  return m ? `${hh}:${String(m).padStart(2, "0")}${ap}` : `${hh}${ap}`;
};

/** Uses Nairobi time (UTC+3) regardless of visitor timezone. */
export function openStatus(now = new Date()) {
  const eat = new Date(now.getTime() + (3 * 60 + now.getTimezoneOffset()) * 60000);
  const day = eat.getDay();
  const mins = eat.getHours() * 60 + eat.getMinutes();
  const today = hours[day];
  if (today && mins >= toMin(today.open) && mins < toMin(today.close)) {
    return { open: true, label: `Open now · Closes ${fmt(today.close)}` };
  }
  if (today && mins < toMin(today.open)) {
    return { open: false, label: `Closed · Opens ${fmt(today.open)} today` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = hours[d];
    if (h) return { open: false, label: `Closed · Opens ${fmt(h.open)} ${i === 1 ? "tomorrow" : dayNames[d]}` };
  }
  return { open: false, label: "Closed" };
}
