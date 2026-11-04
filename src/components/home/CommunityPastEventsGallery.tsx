
import { CalendarDays, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

interface EventType {
    _id: string;
    title: string;
    type: string;
    date: string;
    location: string;
    imageUrl: string;
    description: string;
}

const CommunityPastEventsGallery = async () => {
    // const token = await getTokenFromServer();

    let pastEvents: EventType[] = [];
    let fetchFailed = false;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/pastevents`,
            {
                method: "GET",
                cache: "no-store",
                headers: {
                    // authorization: `Bearer ${token}`
                }
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch past events.");
        }

        pastEvents = await res.json();
    } catch (error) {
        console.error("Failed to load past events:", error);
        fetchFailed = true;
    }

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
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
                {/* Section Heading */}
                <div className="mb-10">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF7900]">
                        Moments That Matter
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-[#073763] sm:text-4xl lg:text-5xl">
                        Community Events Gallery
                    </h2>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                        A look back at the people, shared experiences, and
                        meaningful moments that bring our community together.
                    </p>
                </div>

                {/* Gallery Grid */}
                {fetchFailed ? (
                    <div className="rounded-2xl border border-red-200 bg-white px-6 py-16 text-center">
                        <h3 className="text-lg font-semibold text-[#073763]">
                            We couldn&apos;t load the gallery data
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Please check your connection and try again.
                        </p>
                    </div>
                ) : pastEvents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {pastEvents.map((event, index) => (
                            <article
                                key={event._id}
                                className={`group relative isolate overflow-hidden rounded-2xl bg-slate-200 ${index % 5 === 0
                                        ? "min-h-[420px] sm:row-span-2 sm:min-h-[600px]"
                                        : index % 5 === 2
                                            ? "min-h-[340px]"
                                            : "min-h-[280px]"
                                    }`}
                            >
                                {/* Background Image */}
                                {event.imageUrl && (
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        loading="lazy"
                                        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-slate-950/10 transition-colors duration-300 group-hover:from-slate-950/95" />

                                {/* Event Content */}
                                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                                    <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-white/90 sm:text-sm">
                                        <span className="inline-flex items-center gap-1.5">
                                            <CalendarDays
                                                size={15}
                                                className="text-[#FF7900]"
                                            />
                                            {formatEventDate(event.date)}
                                        </span>

                                        <span className="inline-flex min-w-0 items-center gap-1.5">
                                            <MapPin
                                                size={15}
                                                className="shrink-0 text-[#FF7900]"
                                            />
                                            <span className="line-clamp-1">
                                                {event.location}
                                            </span>
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                                        {event.title}
                                    </h3>

                                    <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4">
                                        <span className="text-xs font-medium text-white/75">
                                            Different community service events
                                        </span>

                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
                        <h3 className="text-xl font-bold text-[#073763]">
                            No Gallery Events Yet
                        </h3>
                        <p className="mt-2 text-slate-500">
                            Community memories will appear here as events are
                            added.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CommunityPastEventsGallery;
