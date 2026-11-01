
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { IEventType } from "@/type/type";

const categoryColors: Record<string, string> = {
  "Community Development": "bg-emerald-50 text-emerald-700",
  "Health & Blood Donation": "bg-rose-50 text-rose-700",
  "Skills & Career": "bg-blue-50 text-blue-700",
  Cultural: "bg-purple-50 text-purple-700",
  Sports: "bg-orange-50 text-orange-700",
  Relief: "bg-amber-50 text-amber-700",
};

function formatEventDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return {
    month: date.toLocaleDateString("en-US", {
      month: "short",
    }),
    day: date.toLocaleDateString("en-US", {
      day: "2-digit",
    }),
    full: date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
}

const EventCard = ({ event }: { event: IEventType }) => {
  const { _id, title, type, date, location, imageUrl } = event;

  const eventDate = formatEventDate(date);

  const badgeColor =
    categoryColors[type] ?? "bg-slate-100 text-slate-700";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-[#073763]/[0.07]">
      {/* Event thumbnail */}
      <Link
        href={`/events/${_id}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
        aria-label={`View ${title}`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#073763] to-[#15558a]">
            <CalendarDays className="h-12 w-12 text-white/70" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

        {/* Date badge */}
        <div className="absolute left-4 top-4 flex min-w-[58px] flex-col items-center rounded-xl bg-white px-3 py-2 shadow-md">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF7900]">
            {eventDate.month}
          </span>
          <span className="text-xl font-bold leading-6 text-[#073763]">
            {eventDate.day}
          </span>
        </div>

        {/* Category badge */}
        <span
          className={`absolute bottom-4 left-4 max-w-[calc(100%-2rem)] truncate rounded-full px-3 py-1.5 text-xs font-semibold ${badgeColor}`}
        >
          {type}
        </span>
      </Link>

      {/* Event details */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-7 text-[#073763] transition-colors group-hover:text-[#FF7900]">
          <Link href={`/events/${_id}`}>
            {title}
          </Link>
        </h3>

        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-2.5 text-sm text-slate-500">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#4DAB2B]" />
            <span>{eventDate.full}</span>
          </div>

          <div className="flex items-start gap-2.5 text-sm text-slate-500">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4DAB2B]" />
            <span className="line-clamp-2">{location}</span>
          </div>
        </div>

        {/* Card footer */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5 mt-5">
          <span className="text-xs font-medium text-slate-400">
            Join your community
          </span>

          <Link
            href={`/events/${_id}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#073763] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b4b83] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#073763]/20"
          >
            View Event
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
