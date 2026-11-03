"use client";

import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    Handshake,
    Heart,
    HeartPulse,
    Leaf,
    Users,
} from "lucide-react";

const impactStats = [
    {
        number: "150+",
        label: "Active Volunteers",
        icon: Users,
        color: "text-blue-600",
    },
    {
        number: "100+",
        label: "Events Completed",
        icon: CalendarDays,
        color: "text-[#FF7900]",
    },
    {
        number: "500+",
        label: "Lives Impacted",
        icon: Heart,
        color: "text-[#4DAB2B]",
    },
    {
        number: "100%",
        label: "Community Driven",
        icon: Handshake,
        color: "text-[#073763]",
    },
];

const initiatives = [
    {
        title: "Community Clean-up",
        subtitle: "Greener Tomorrow",
        icon: Leaf,
        iconColor: "text-[#4DAB2B]",
        iconBg: "bg-green-100",
    },
    {
        title: "Health & Wellness",
        subtitle: "Healthier Community",
        icon: HeartPulse,
        iconColor: "text-[#FF7900]",
        iconBg: "bg-orange-100",
    },
    {
        title: "Support Those in Need",
        subtitle: "A Stronger Community",
        icon: Users,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-100",
    },
];

const Banner = () => {
    return (
        <section className="relative isolate overflow-hidden bg-[#F8FAFC]">
            {/* Background decorations */}
            <div
                aria-hidden="true"
                className="absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-green-100/50 blur-3xl"
            />

            <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
                {/* Main hero */}
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
                    {/* Left content */}
                    <div className="relative z-10">
                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white px-4 py-2.5 shadow-sm">
                            <Users className="h-5 w-5 text-[#073763]" />
                            <span className="text-sm font-bold text-[#073763]">
                                Stronger Together
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="mt-7 text-4xl font-extrabold leading-[1.12] tracking-tight text-[#073763] sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                            Build a Kinder,
                            <br />
                            More Connected
                            <br />
                            <span className="relative inline-block italic text-[#FF7900]">
                                Community
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 340 18"
                                    fill="none"
                                    className="absolute -bottom-2 left-0 w-full"
                                >
                                    <path
                                        d="M5 12C85 1 245 2 335 10"
                                        stroke="#FF7900"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h1>

                        {/* Intro */}
                        <p className="mt-8 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                            Discover local events, volunteer for meaningful
                            causes, and be part of positive change in our
                            community. Together, we can make a difference that
                            lasts.
                        </p>

                        {/* CTA buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/events"
                                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FF7900] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-orange-200 transition duration-200 hover:-translate-y-1 hover:bg-[#e86e00] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 sm:px-7 sm:text-base"
                            >
                                <CalendarDays className="h-5 w-5" />
                                Explore Upcoming Events
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/events/create-event"
                                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border-2 border-[#073763] bg-white px-6 py-4 text-sm font-bold text-[#073763] transition duration-200 hover:-translate-y-1 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 sm:px-7 sm:text-base"
                            >
                                <Heart className="h-5 w-5" />
                                Create Event
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Right image composition */}
                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                        {/* Decorative shapes */}
                        <div
                            aria-hidden="true"
                            className="absolute -left-4 top-16 h-36 w-36 rounded-full bg-[#FF7900]/15 sm:-left-8 sm:h-48 sm:w-48"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute -right-3 top-0 h-32 w-32 rounded-full bg-[#4DAB2B]/15 sm:-right-5 sm:h-44 sm:w-44"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute -bottom-5 right-5 h-32 w-32 rounded-full bg-blue-100/80 sm:h-44 sm:w-44"
                        />

                        {/* Main image */}
                        <div className="relative mx-auto aspect-[4/4.2] w-full max-w-[540px] overflow-hidden rounded-[44%_44%_32%_32%/30%_30%_22%_22%] border-[6px] border-white shadow-2xl shadow-[#073763]/15 sm:rounded-[46%_46%_30%_30%/28%_28%_20%_20%]">
                            <img
                                src="https://www.boisestate.edu/research-resilience/wp-content/uploads/sites/234/2023/03/pexels-rodnae-productions-6646917-scaled.jpeg"
                                alt="Community volunteers working together to support people in need"
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#073763]/25 via-transparent to-transparent" />
                        </div>

                        {/* Floating message */}
                        <div className="absolute bottom-6 left-0 flex max-w-[270px] items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur sm:-left-6 sm:bottom-10">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100">
                                <HeartHandshakeIcon />
                            </div>
                            <div>
                                <p className="text-sm font-extrabold text-[#073763]">
                                    Together, We Can
                                </p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Every helping hand matters.
                                </p>
                            </div>
                        </div>

                        {/* Decorative spark */}
                        <div
                            aria-hidden="true"
                            className="absolute -right-1 top-10 hidden h-14 w-14 rotate-12 items-center justify-center rounded-2xl bg-[#FF7900] text-white shadow-lg sm:flex"
                        >
                            <Heart className="h-7 w-7 fill-white" />
                        </div>
                    </div>
                </div>

                {/* Impact statistics */}
                <div className="relative mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-5 lg:grid-cols-4">
                    {impactStats.map((stat) => {
                        const StatIcon = stat.icon;

                        return (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-blue-100/80 bg-white/95 px-3 py-5 text-center shadow-md shadow-blue-900/[0.04] transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:px-5 sm:py-6"
                            >
                                <StatIcon
                                    className={`mx-auto h-8 w-8 ${stat.color}`}
                                />
                                <p className="mt-2 text-2xl font-extrabold tracking-tight text-[#073763] sm:text-3xl">
                                    {stat.number}
                                </p>
                                <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

function HeartHandshakeIcon() {
    return <Handshake className="h-6 w-6 text-[#4DAB2B]" />;
}

export default Banner;