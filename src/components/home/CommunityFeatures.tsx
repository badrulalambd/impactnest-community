"use client";

import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    HeartHandshake,
    Users,
    Sprout,
    Sparkles,
} from "lucide-react";

const features = [
    {
        number: "01",
        title: "Discover Local Events",
        description:
            "Find meaningful activities happening around you, from community cleanups to donation drives and social gatherings.",
        icon: CalendarDays,
        iconColor: "text-[#FF7900]",
        iconBg: "bg-orange-50",
        iconBorder: "border-orange-100",
        link: "/events",
        linkText: "Explore events",
    },
    {
        number: "02",
        title: "Make a Real Impact",
        description:
            "Turn your time and energy into positive change. Every small contribution can make a meaningful difference.",
        icon: Sprout,
        iconColor: "text-[#4DAB2B]",
        iconBg: "bg-green-50",
        iconBorder: "border-green-100",
        link: "/events",
        linkText: "Find your cause",
    },
    {
        number: "03",
        title: "Connect with People",
        description:
            "Meet like-minded individuals, build friendships, share ideas, and grow stronger through shared experiences.",
        icon: Users,
        iconColor: "text-[#073763]",
        iconBg: "bg-blue-50",
        iconBorder: "border-blue-100",
        link: "/events",
        linkText: "Meet your community",
    },
    {
        number: "04",
        title: "Bring Ideas to Life",
        description:
            "Have an idea that could help others? Create an event, invite your community, and turn your vision into action.",
        icon: HeartHandshake,
        iconColor: "text-[#FF7900]",
        iconBg: "bg-orange-50",
        iconBorder: "border-orange-100",
        link: "/events/create-event",
        linkText: "Create an event",
    },
];

const CommunityFeatures = () => {
    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
            {/* Subtle background decoration */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-green-50 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-orange-50/70 blur-3xl"
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4DAB2B]/20 bg-green-50/70 px-4 py-2">
                        <Sparkles className="h-4 w-4 text-[#4DAB2B]" />
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#073763] sm:text-sm">
                            What Makes Us Different
                        </span>
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#073763] sm:text-4xl lg:text-5xl">
                        More Than Events.
                        <br className="hidden sm:block" />{" "}
                        <span className="text-[#FF7900]">
                            A Community That Cares.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                        Real change happens when people come together with a
                        shared purpose. We make it easier to connect, take
                        action, and build a community where everyone belongs.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
                    {features.map((feature) => {
                        const FeatureIcon = feature.icon;

                        return (
                            <article
                                key={feature.number}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl hover:shadow-[#073763]/5 sm:p-7"
                            >
                                {/* Card top */}
                                <div className="flex items-start justify-between">
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${feature.iconBg} ${feature.iconBorder} transition duration-300 group-hover:scale-105`}
                                    >
                                        <FeatureIcon
                                            className={`h-7 w-7 ${feature.iconColor}`}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <span className="text-sm font-bold tracking-wider text-slate-300 transition-colors group-hover:text-[#FF7900]">
                                        {feature.number}
                                    </span>
                                </div>

                                {/* Card content */}
                                <h3 className="mt-7 text-xl font-extrabold leading-snug text-[#073763]">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                                    {feature.description}
                                </p>

                                {/* Card link */}
                                <Link
                                    href={feature.link}
                                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#073763] transition-colors hover:text-[#FF7900] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900] focus-visible:ring-offset-4"
                                >
                                    {feature.linkText}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                {/* Bottom accent */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#FF7900] transition-all duration-300 group-hover:w-full" />
                            </article>
                        );
                    })}
                </div>

                {/* Closing callout */}
                <div className="mt-10 flex flex-col gap-5 rounded-2xl bg-[#073763] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:mt-12 lg:px-10">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                            <HeartHandshake className="h-6 w-6 text-[#4DAB2B]" />
                        </div>

                        <div>
                            <h3 className="text-lg font-extrabold text-white sm:text-xl">
                                Every great change starts with someone like you.
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-white/70">
                                Take the first step. Find an event or start
                                something meaningful in your community.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/events"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF7900] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#e86e00] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/40"
                    >
                        Get Involved
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CommunityFeatures;