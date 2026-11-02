"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
    ArrowRight,
    CalendarDays,
    Clock3,
    Edit3,
    Eye,
    MapPin,
    Plus,
    Trash2,
    Users,
} from "lucide-react";
import { toast } from "react-hot-toast";
import EditEventDialog from "./EditEventDialog";
import DeleteEventAlert from "./DeleteEventAlert";

import { IEventType } from "@/type/type";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL;

type EventItem = {
    _id: string;
    title: string;
    type: string;
    date: string;
    location: string;
    imageUrl: string;
    description: string;
    email: string;
};

function formatEventDate(dateString: string) {
    const date = new Date(`${dateString.slice(0, 10)}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

const ManageEventsData = () => {
    const { data: session, isPending } = authClient.useSession();
    const userEmail = session?.user?.email;

    const [events, setEvents] = useState<IEventType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    function handleEventUpdated(updatedEvent: IEventType) {
        setEvents((currentEvents) =>
            currentEvents.map((event) =>
                event._id === updatedEvent._id
                    ? updatedEvent
                    : event
            )
        );
    }

    useEffect(() => {
        if (isPending) return;

        if (!userEmail) {
            setEvents([]);
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        async function fetchUserEvents() {
            setIsLoading(true);
            setError("");

            try {
                if (!API_BASE_URL) {
                    throw new Error("The API URL is not configured.");
                }

                const response = await fetch(
                    `${API_BASE_URL}/events/${encodeURIComponent(userEmail!)}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        cache: "no-store",
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to load your events.");
                }

                const data = await response.json();

                const eventList: EventItem[] = Array.isArray(data)
                    ? data
                    : Array.isArray(data.events)
                        ? data.events
                        : Array.isArray(data.data)
                            ? data.data
                            : [];

                // Keep only events belonging to the logged-in user.
                const userEvents = eventList.filter(
                    (event) =>
                        event.email?.toLowerCase() ===
                        userEmail!.toLowerCase()
                );

                setEvents(userEvents);
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong while loading your events."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        fetchUserEvents();

        return () => controller.abort();
    }, [userEmail, isPending]);

    if (isPending || isLoading) {
        return (
            <main className="min-h-screen bg-[#F8FAFC] px-4 py-16 sm:px-6">
                <div className="mx-auto max-w-7xl">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 w-56 rounded-lg bg-slate-200" />
                        <div className="h-4 w-full max-w-xl rounded bg-slate-200" />
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                                >
                                    <div className="h-52 bg-slate-200" />
                                    <div className="space-y-4 p-5">
                                        <div className="h-5 rounded bg-slate-200" />
                                        <div className="h-4 rounded bg-slate-100" />
                                        <div className="h-10 rounded bg-slate-100" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            {/* Hero section */}
            <section className="relative isolate overflow-hidden bg-[#073763] px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24">
                <div
                    aria-hidden="true"
                    className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-[#4DAB2B]/20 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="absolute -bottom-32 left-1/3 -z-10 h-80 w-80 rounded-full bg-[#FF7900]/20 blur-3xl"
                />

                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <div className="max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/90">
                            <Users className="h-4 w-4 text-[#FF7900]" />
                            YOUR COMMUNITY, YOUR IMPACT
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                            Manage Your{" "}
                            <span className="text-[#FF7900]">Events</span>
                        </h1>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                            Every great initiative starts with someone who
                            cares. Keep your events organized, update your
                            plans, and continue bringing your community
                            together for meaningful change.
                        </p>
                    </div>

                    <Link
                        href="/events/create-event"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF7900] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#e86e00] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF7900]/30"
                    >
                        <Plus className="h-5 w-5" />
                        Create New Event
                    </Link>
                </div>

                <div className="mx-auto mt-10 max-w-7xl border-t border-white/15 pt-5">
                    <p className="text-sm text-white/70">
                        Your ideas. Your events. Your community impact.
                    </p>
                </div>
            </section>

            {/* Events section */}
            <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#FF7900]">
                            EVENT DASHBOARD
                        </p>

                        <h2 className="text-2xl font-bold tracking-tight text-[#073763] sm:text-3xl">
                            Your Events
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                            View your events and manage them in one place.
                        </p>
                    </div>

                    {!error && (
                        <p className="text-sm font-medium text-slate-500">
                            {events.length}{" "}
                            {events.length === 1 ? "event" : "events"} created
                        </p>
                    )}
                </div>

                {error ? (
                    <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center">
                        <h3 className="text-lg font-bold text-slate-800">
                            Couldn&apos;t load your events
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                            {error}
                        </p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-5 rounded-lg bg-[#073763] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#05294a]"
                        >
                            Try Again
                        </button>
                    </div>
                ) : !userEmail ? (
                    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
                        <Users className="mx-auto h-10 w-10 text-slate-400" />
                        <h3 className="mt-4 text-xl font-bold text-[#073763]">
                            Sign in to manage your events
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Your created events will appear here once you sign in.
                        </p>
                        <Link
                            href="/sign-in"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF7900] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e86e00]"
                        >
                            Sign In
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                ) : events.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#073763]/5">
                            <CalendarDays className="h-8 w-8 text-[#073763]" />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-[#073763]">
                            Your next big idea starts here
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            You haven&apos;t created any events yet. Start something
                            meaningful and invite your community to be part of it.
                        </p>

                        <Link
                            href="/events/create-event"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF7900] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e86e00]"
                        >
                            <Plus className="h-4 w-4" />
                            Create Your First Event
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <article
                                key={event._id}
                                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#073763]/5"
                            >
                                {/* Event image */}
                                <Link
                                    href={`/events/${event._id}`}
                                    className="relative block h-52 overflow-hidden bg-slate-100"
                                >
                                    {event.imageUrl ? (
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <CalendarDays className="h-12 w-12 text-slate-300" />
                                        </div>
                                    )}

                                    <span className="absolute left-4 top-4 max-w-[85%] truncate rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#073763] shadow-sm">
                                        {event.type}
                                    </span>
                                </Link>

                                {/* Event information */}
                                <div className="flex flex-1 flex-col p-5">
                                    <h3 className="line-clamp-2 text-lg font-bold leading-7 text-[#073763] transition-colors group-hover:text-[#FF7900]">
                                        {event.title}
                                    </h3>

                                    <div className="mt-4 space-y-3 text-sm text-slate-500">
                                        <p className="flex items-center gap-2.5">
                                            <CalendarDays className="h-4 w-4 shrink-0 text-[#FF7900]" />
                                            <span>{formatEventDate(event.date)}</span>
                                        </p>

                                        <p className="flex min-w-0 items-center gap-2.5">
                                            <MapPin className="h-4 w-4 shrink-0 text-[#FF7900]" />
                                            <span className="truncate">
                                                {event.location}
                                            </span>
                                        </p>

                                        <p className="flex items-center gap-2.5">
                                            <Clock3 className="h-4 w-4 shrink-0 text-[#FF7900]" />
                                            <span>Community event</span>
                                        </p>
                                    </div>

                                    {/* Card actions */}
                                    <div className="grid grid-cols-3 gap-2 justify-between items-center border-t border-slate-100 pt-5 mt-5">
                                        <Link
                                            href={`/events/${event._id}`}
                                            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg bg-[#073763] px-2 py-2.5 text-xs font-semibold text-white transition hover:bg-[#05294a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#073763] focus-visible:ring-offset-2 sm:text-sm"
                                        >
                                            <Eye className="h-4 w-4 shrink-0" />
                                            <span>View</span>
                                        </Link>

                                        <div>
                                            <EditEventDialog
                                                event={event}
                                                onUpdated={handleEventUpdated}
                                            />
                                        </div>

                                        <div>
                                            <DeleteEventAlert
                                                _id={event._id}
                                            /> </div>

                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default ManageEventsData;