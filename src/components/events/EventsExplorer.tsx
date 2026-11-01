
"use client";

import {
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Search,
  Users,
  X,
} from "lucide-react";
import EventCard from "@/components/events/EventCard";
import type { IEventType } from "@/type/type";

const categories = [
  "All",
  "Community Development",
  "Health & Blood Donation",
  "Skills & Career",
  "Cultural",
  "Sports",
  "Relief",
] as const;

type Category = (typeof categories)[number];

type Props = {
  events: IEventType[];
  hasError: boolean;
};

function getLocalDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Provide a stable subscription for a client-derived value.
function subscribeToNothing(): () => void {
  return () => {};
}

// Keep the server-rendered and initial hydration snapshots consistent.
function getServerDateSnapshot(): string {
  return "";
}

function getClientDateSnapshot(): string {
  return getLocalDate();
}

export default function EventsExplorer({
  events,
  hasError,
}: Props) {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

  const [searchQuery, setSearchQuery] = useState("");

  // Avoid hydration mismatches and avoid setting state inside an effect.
  const today = useSyncExternalStore(
    subscribeToNothing,
    getClientDateSnapshot,
    getServerDateSnapshot
  );

  const upcomingEvents = useMemo(() => {
    if (!today) return [];

    return events.filter((event) => {
      const eventDate = event.date;

      // Expect dates in YYYY-MM-DD format.
      return (
        typeof eventDate === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(eventDate) &&
        eventDate >= today
      );
    });
  }, [events, today]);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return upcomingEvents.filter((event) => {
      const matchesCategory =
        activeCategory === "All" ||
        event.type === activeCategory;

      const searchableValues: unknown[] = [
        event.title,
        event.location,
        event.type,
        event.description,
      ];

      const matchesSearch =
        !query ||
        searchableValues.some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [upcomingEvents, activeCategory, searchQuery]);

  const categoryCount = (category: Category): number => {
    if (category === "All") {
      return upcomingEvents.length;
    }

    return upcomingEvents.filter(
      (event) => event.type === category
    ).length;
  };

  return (
    <>
      {/* Hero section */}
      <section className="relative isolate overflow-hidden bg-[#073763]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 20%, #4DAB2B 0, transparent 24%), radial-gradient(circle at 15% 100%, #FF7900 0, transparent 30%)",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
                <span className="h-2 w-2 rounded-full bg-[#4DAB2B]" />
                Together, We Make a Difference
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Discover Events.
                <span className="mt-1 block text-[#FF7900]">
                  Inspire Change.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                Find meaningful community events, meet
                like-minded people, and turn small actions
                into lasting change. Your next opportunity
                to make a difference starts here.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/create-event"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF7900] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-[#e86e00] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/40"
                >
                  Create Event
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Users className="h-4 w-4 text-[#4DAB2B]" />
                  <span>Connect. Contribute. Grow.</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="flex h-48 w-48 flex-col items-center justify-center rounded-full border border-white/15 bg-white/[0.06] shadow-2xl shadow-black/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF7900] shadow-lg">
                  <CalendarDays className="h-8 w-8 text-white" />
                </div>

                <p className="mt-4 text-sm font-semibold text-white">
                  Make It Meaningful
                </p>

                <p className="mt-1 text-xs text-white/60">
                  Every action counts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#4DAB2B]">
              Find Your Next Experience
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#073763] sm:text-3xl">
              Upcoming Events
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Explore opportunities to connect, contribute,
              and make a positive impact.
            </p>
          </div>

          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
            <CalendarDays className="h-4 w-4 text-[#4DAB2B]" />
            {today
              ? `${upcomingEvents.length} upcoming events`
              : "Loading events..."}
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-5">
          <div
            className="flex gap-2 overflow-x-auto pb-3"
            aria-label="Filter events by category"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "border-[#073763] bg-[#073763] text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[#073763]/30 hover:bg-slate-50 hover:text-[#073763]"
                  }`}
                >
                  {category}

                  <span
                    className={`rounded-md px-1.5 py-0.5 text-xs ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {categoryCount(category)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder={`Search ${
                activeCategory === "All"
                  ? "all events"
                  : activeCategory.toLowerCase()
              }...`}
              aria-label="Search events"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#073763] focus:ring-4 focus:ring-[#073763]/10"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-[#073763]">
              {today ? filteredEvents.length : 0}
            </span>{" "}
            of {categoryCount(activeCategory)} events
          </p>
        </div>

        {/* Results */}
        {hasError ? (
          <div className="rounded-2xl border border-red-200 bg-white px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-[#073763]">
              We couldn&apos;t load the events
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Please check your connection and try again.
            </p>
          </div>
        ) : !today ? (
          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            aria-label="Loading upcoming events"
            aria-busy="true"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center sm:py-20">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Search className="h-6 w-6 text-slate-400" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-[#073763]">
              {searchQuery.trim()
                ? "No matching events found"
                : activeCategory === "All"
                  ? "No upcoming events yet"
                  : `No upcoming ${activeCategory.toLowerCase()} events`}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {searchQuery.trim()
                ? "Try another search term or select a different category to discover more events."
                : "Be the first to bring your community together. Create an event and inspire others to participate."}
            </p>

            {searchQuery.trim() ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#073763] hover:text-[#FF7900]"
              >
                Clear search
                <X className="h-4 w-4" />
              </button>
            ) : (
              <Link
                href="/create-event"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e86e00]"
              >
                Create an Event
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </section>
    </>
  );
}