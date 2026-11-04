
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import JoinEvent from "@/components/events/JoinEvent";
import { getTokenFromServer } from "@/lib/getTokensServer";

type Props = {
  params: Promise<{ eventId: string }>;
};

type EventDetail = {
  _id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  imageUrl: string;
  description: string;
  email: string;
};

const EventDetailPage = async ({ params }: Props) => {
  const { eventId } = await params;
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("The events API URL is not configured.");
  }

  let eventDetail: EventDetail;

  const token = await getTokenFromServer();
  try {
    const res = await fetch(
      `${apiBaseUrl}/events/single/${encodeURIComponent(eventId)}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        return (
          <main className="min-h-screen bg-[#F8FAFC] px-4 py-20">
            <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
              <CalendarDays className="mx-auto h-12 w-12 text-slate-300" />
              <h1 className="mt-5 text-2xl font-bold text-[#073763]">
                Event not found
              </h1>
              <p className="mt-3 text-slate-500">
                This event may have been removed or the link may
                be incorrect.
              </p>
              <Link
                href="/events"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#073763] px-5 py-3 font-semibold text-white transition hover:bg-[#05294b]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Upcoming Events
              </Link>
            </div>
          </main>
        );
      }

      throw new Error("Unable to fetch event details.");
    }

    eventDetail = await res.json();
  } catch (error) {
    console.error("Failed to load event:", error);
    throw error;
  }

  const {
    _id,
    title,
    type,
    date,
    location,
    imageUrl,
    description,
    email,
  } = eventDetail;

  const parsedDate = date ? new Date(date) : null;
  const validDate =
    parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate
      : null;

  const formattedDate = validDate
    ? validDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Date to be announced";

  const formattedMonth = validDate
    ? validDate.toLocaleDateString("en-US", {
        month: "short",
      })
    : "TBA";

  const formattedDay = validDate
    ? validDate.toLocaleDateString("en-US", {
        day: "2-digit",
      })
    : "--";

  const isUpcoming = validDate
    ? new Date(
        validDate.getFullYear(),
        validDate.getMonth(),
        validDate.getDate()
      ).getTime() >=
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ).getTime()
    : false;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Top navigation */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#073763]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition group-hover:border-[#073763] group-hover:bg-blue-50">
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            </span>
            Back to Upcoming Events
          </Link>

          <div className="hidden items-center gap-2 text-sm font-semibold text-[#073763] sm:flex">
            <Heart className="h-4 w-4 text-[#FF7900]" />
            Community Drives
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        {/* Hero image */}
        <section className="relative isolate overflow-hidden rounded-3xl bg-[#073763] shadow-xl shadow-blue-950/10">
          <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[530px]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#073763] via-[#0B4D7C] to-[#16816A]">
                <CalendarDays className="h-24 w-24 text-white/20" />
              </div>
            )}

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/10" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-2">
                {type && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-[#FFAD59]" />
                    {type}
                  </span>
                )}

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md ${
                    isUpcoming
                      ? "border border-emerald-300/30 bg-emerald-500/20 text-emerald-50"
                      : "border border-white/20 bg-white/15 text-white"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isUpcoming ? "bg-emerald-300" : "bg-white/70"
                    }`}
                  />
                  {isUpcoming ? "Upcoming Event" : "Past Event"}
                </span>
              </div>

              <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
                {title}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-sm text-white/85 sm:text-base">
                <MapPin className="h-5 w-5 shrink-0 text-[#FFAD59]" />
                <span>{location || "Location to be announced"}</span>
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/85">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#FFAD59]" />
                  {formattedDate}
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#FFAD59]" />
                  Make a difference together
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content and sidebar */}
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-10">
          {/* Event description */}
          <div className="min-w-0 space-y-8">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50">
                  <Heart className="h-6 w-6 text-[#FF7900]" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF7900]">
                    The purpose
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#073763] sm:text-3xl">
                    About this event
                  </h2>
                </div>
              </div>

              <div className="mt-6 whitespace-pre-line text-[15px] leading-8 text-slate-600">
                {description ||
                  "More information about this event will be available soon."}
              </div>

              <div className="mt-8 rounded-2xl bg-[#F8FAFC] p-5 sm:p-6">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                    <CheckCircle2 className="h-5 w-5 text-[#4DAB2B]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#073763]">
                      Every contribution matters
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Join your community, connect with people who
                      care, and help turn positive intentions into
                      meaningful action.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Event information */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF7900]">
                  Plan your participation
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#073763]">
                  Event information
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <CalendarDays className="h-5 w-5 text-[#073763]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      Event date
                    </p>
                    <p className="mt-1 font-bold text-slate-800">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                    <MapPin className="h-5 w-5 text-[#FF7900]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      Location
                    </p>
                    <p className="mt-1 break-words font-bold text-slate-800">
                      {location || "To be announced"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                    <TagIcon />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      Event category
                    </p>
                    <p className="mt-1 font-bold text-slate-800">
                      {type || "Community event"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                    <Clock3 className="h-5 w-5 text-purple-700" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      Event schedule
                    </p>
                    <p className="mt-1 font-bold text-slate-800">
                      Contact the organizer
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6">
            {/* Join event card */}
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5">
              <div className="bg-gradient-to-br from-[#073763] to-[#0D527A] p-6 text-white">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-100">
                  <Sparkles className="h-4 w-4 text-[#FFAD59]" />
                  Be part of the change
                </div>

                <h2 className="mt-3 text-2xl font-bold leading-tight">
                  Your community needs you.
                </h2>

                <p className="mt-3 text-sm leading-6 text-blue-100/85">
                  Take the next step. Join this event and help make a
                  positive difference.
                </p>
              </div>

              <div className="p-6">
                <div className="mb-5 flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-4">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white">
                    <span className="text-xs font-bold uppercase text-[#FF7900]">
                      {formattedMonth}
                    </span>
                    <span className="text-xl font-extrabold text-[#073763]">
                      {formattedDay}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="font-bold text-slate-800">
                      {validDate ? "Mark your calendar" : "Date pending"}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {validDate ? formattedDate : "Check with the organizer"}
                    </p>
                  </div>
                </div>

                {isUpcoming ? (
                  // <JoinEvent eventDetail={eventDetail} />
                  <JoinEvent/>
                ) : (
                  <p className="rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-500">
                    This event has already taken place.
                  </p>
                )}

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  Sign in or create an account to join this event and be part of the community!
                </p>
              </div>
            </section>

            {/* Organizer card */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#073763]" />
                <h2 className="text-lg font-bold text-[#073763]">
                  Event organizer
                </h2>
              </div>

              <div className="mt-5 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Mail className="h-5 w-5 text-[#073763]" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-800">
                    Organized by
                  </p>

                  <p className="mt-1 break-all text-sm leading-6 text-slate-500">
                    {email || "Organizer information unavailable"}
                  </p>
                </div>
              </div>

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#073763] transition hover:border-[#073763] hover:bg-blue-50"
                >
                  Contact organizer
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}

              <div className="mt-5 flex items-start gap-2 border-t border-slate-100 pt-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#4DAB2B]" />
                <p className="text-xs leading-5 text-slate-500">
                  Have a question about the event? Contact the organizer
                  for further information.
                </p>
              </div>
            </section>

            {/* Community message */}
            <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
              <div className="flex gap-3">
                <Heart className="mt-0.5 h-5 w-5 shrink-0 text-[#FF7900]" />
                <div>
                  <h3 className="font-bold text-[#073763]">
                    Small actions, big impact
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Positive change starts when people come together
                    for a shared purpose.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom navigation */}
        <div className="mt-10 border-t border-slate-200 pt-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#073763] transition hover:text-[#FF7900]"
          >
            <ArrowLeft className="h-4 w-4" />
            Explore more community events
          </Link>
        </div>
      </div>
    </main>
  );
};

function TagIcon() {
  return <Sparkles className="h-5 w-5 text-[#4DAB2B]" />;
}

export default EventDetailPage;
