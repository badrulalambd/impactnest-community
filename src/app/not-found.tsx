
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Compass,
    HeartHandshake,
} from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#F8FAFC] px-4 py-16 sm:px-6">
            {/* Decorative background elements */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#4DAB2B]/10 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#FF7900]/10 blur-3xl"
            />

            <div className="relative mx-auto w-full max-w-3xl text-center">
                {/* Illustration */}
                <div className="relative mx-auto mb-8 flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#073763]/20" />

                    <div className="absolute left-1 top-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#FF7900] shadow-md sm:left-2">
                        <Compass className="h-6 w-6" />
                    </div>

                    <div className="flex h-32 w-32 flex-col items-center justify-center rounded-[2rem] bg-[#073763] text-white shadow-xl shadow-[#073763]/20 sm:h-36 sm:w-36">
                        <span className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                            404
                        </span>
                        <span className="mt-1 text-xs font-medium tracking-[0.2em] text-white/70">
                            LOST IN SPACE
                        </span>
                    </div>

                    <div className="absolute bottom-5 right-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF7900] text-white shadow-lg sm:right-1">
                        <CalendarDays className="h-6 w-6" />
                    </div>
                </div>

                {/* Hero content */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#073763]/10 bg-white px-4 py-2 text-xs font-bold tracking-widest text-[#073763] shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-[#4DAB2B]" />
                    WRONG TURN?
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-[#073763] sm:text-5xl lg:text-6xl">
                    Looks like this page
                    <span className="mt-2 block text-[#FF7900]">
                        went off the radar.
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                    The page you&apos;re looking for may have moved or no longer
                    exists. But there&apos;s still a community out there waiting
                    for you. Let&apos;s get you back on track!
                </p>

                {/* Actions */}
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF7900] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF7900]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#e86e00] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF7900]/30 sm:w-auto"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>

                    <Link
                        href="/events"
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-[#073763] transition duration-200 hover:border-[#073763]/30 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#073763]/10 sm:w-auto"
                    >
                        <HeartHandshake className="h-4 w-4" />
                        Explore Events
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <p className="mt-10 text-xs font-medium text-slate-400 sm:text-sm">
                    Every great journey starts with the right direction.
                </p>
            </div>
        </main>
    );
}
