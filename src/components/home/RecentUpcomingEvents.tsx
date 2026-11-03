import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    MapPin,
    MoveUpRight,
} from "lucide-react";
import { getTokenFromServer } from "@/lib/getTokensServer";

interface EventType {
    _id: string;
    title: string;
    type: string;
    date: string;
    location: string;
    imageUrl: string;
    description: string;
}

const RecentUpcomingEvents = async () => {
    const token = await getTokenFromServer();
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/recentevents`,
        {
            method: "GET",
            cache: "no-store",
            headers: {
                authorization: `Bearer ${token}`
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch recent events.");
    }

    const recentSixEvents: EventType[] = await res.json();

    const formatEventDate = (date: string) => {
        const parsedDate = new Date(`${date}T00:00:00`);

        if (Number.isNaN(parsedDate.getTime())) return date;

        return parsedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
                {/* Section Heading */}
                <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <span className="mb-3 inline-flex items-center rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-[#FF7900]">
                            Discover & Participate
                        </span>

                        <h2 className="text-3xl font-bold tracking-tight text-[#073763] sm:text-4xl lg:text-5xl">
                            Upcoming Events
                            <span className="text-[#FF7900]"> Near You</span>
                        </h2>

                        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                            Find meaningful ways to connect, give back, and
                            make a positive difference in your community.
                        </p>
                    </div>

                    <Link
                        href="/events"
                        className="inline-flex w-fit shrink-0 items-center gap-2 font-semibold text-[#073763] transition-colors hover:text-[#FF7900]"
                    >
                        Explore All Events
                        <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Events Grid */}
                {recentSixEvents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {recentSixEvents.map((event) => (
                            <article
                                key={event._id}
                                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Event Image */}
                                <div className="relative h-56 overflow-hidden bg-slate-100">
                                    {event.imageUrl ? (
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-slate-400">
                                            No image available
                                        </div>
                                    )}

                                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#073763] shadow-sm backdrop-blur">
                                        {event.type}
                                    </span>
                                </div>

                                {/* Event Details */}
                                <div className="p-5 sm:p-6">
                                    <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                                        <span className="inline-flex items-center gap-1.5">
                                            <CalendarDays
                                                size={16}
                                                className="text-[#FF7900]"
                                            />
                                            {formatEventDate(event.date)}
                                        </span>

                                        <span className="inline-flex min-w-0 items-center gap-1.5">
                                            <MapPin
                                                size={16}
                                                className="shrink-0 text-[#FF7900]"
                                            />
                                            <span className="line-clamp-1">
                                                {event.location}
                                            </span>
                                        </span>
                                    </div>

                                    <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-snug text-[#073763] transition-colors group-hover:text-[#FF7900]">
                                        {event.title}
                                    </h3>

                                    <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600">
                                        {event.description}
                                    </p>

                                    <div className="mt-6 border-t border-slate-100 pt-4">
                                        <Link
                                            href={`/events/${event._id}`}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-[#073763] transition-colors hover:text-[#FF7900]"
                                        >
                                            View Event Details
                                            <MoveUpRight
                                                size={17}
                                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <CalendarDays
                            size={36}
                            className="mx-auto mb-4 text-slate-400"
                        />
                        <h3 className="text-xl font-bold text-[#073763]">
                            No Upcoming Events Yet
                        </h3>
                        <p className="mt-2 text-slate-500">
                            Check back soon for new community events.
                        </p>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href="/events"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#073763] px-7 py-3.5 font-semibold text-white shadow-md transition-all hover:bg-[#0B4A82] hover:shadow-lg"
                    >
                        Browse All Events
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RecentUpcomingEvents;
