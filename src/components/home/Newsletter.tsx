"use client"


import {
    ArrowRight,
    Mail,
    Sparkles,
    Heart,
    Users,
} from "lucide-react";

const Newsletter = () => {
    return (
        <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
                <div className="relative isolate overflow-hidden rounded-3xl bg-[#073763] px-6 py-12 shadow-xl sm:px-10 sm:py-16 lg:px-16 lg:py-20">
                    {/* Decorative Background Elements */}
                    <div className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#FF7900]/20 blur-3xl" />
                    <div className="absolute -bottom-32 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left Content */}
                        <div className="max-w-xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                                <Sparkles
                                    size={16}
                                    className="text-[#FF7900]"
                                />
                                Stay Connected, Make an Impact
                            </div>

                            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                                Good Things Happen When We{" "}
                                <span className="text-[#FF7900]">
                                    Come Together.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-lg text-base leading-7 text-blue-100 sm:text-lg">
                                Get the latest community events, volunteer
                                opportunities, and inspiring stories delivered
                                straight to your inbox. Be part of something
                                meaningful.
                            </p>

                            {/* Community Highlights */}
                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                                <div className="flex items-center gap-2 text-sm text-white/90">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                                        <Mail
                                            size={17}
                                            className="text-[#FF7900]"
                                        />
                                    </span>
                                    Community updates
                                </div>

                                <div className="flex items-center gap-2 text-sm text-white/90">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                                        <Heart
                                            size={17}
                                            className="text-[#FF7900]"
                                        />
                                    </span>
                                    Meaningful causes
                                </div>

                                <div className="flex items-center gap-2 text-sm text-white/90">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                                        <Users
                                            size={17}
                                            className="text-[#FF7900]"
                                        />
                                    </span>
                                    Volunteer opportunities
                                </div>
                            </div>
                        </div>

                        {/* Subscription Form Design */}
                        <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md sm:p-8">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white">
                                    Join Our Newsletter
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-blue-100">
                                    A little inspiration and a lot of
                                    community spirit, delivered regularly.
                                </p>
                            </div>

                            <form
                                onSubmit={(event) => event.preventDefault()}
                                className="flex flex-col gap-3 sm:flex-row"
                            >
                                <label
                                    htmlFor="newsletter-email"
                                    className="sr-only"
                                >
                                    Your email address
                                </label>

                                <input
                                    id="newsletter-email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#FF7900] focus:ring-2 focus:ring-[#FF7900]/30"
                                />

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF7900] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                                >
                                    Subscribe
                                    <ArrowRight size={17} />
                                </button>
                            </form>

                            <p className="mt-4 text-xs leading-5 text-blue-100/80">
                                Stay inspired. Stay involved. Unsubscribe
                                whenever you like.
                            </p>

                            {/* Decorative Bottom Detail */}
                            <div className="mt-7 border-t border-white/15 pt-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#174775] bg-orange-100 text-xs font-bold text-[#073763]">
                                            C
                                        </span>
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#174775] bg-blue-100 text-xs font-bold text-[#073763]">
                                            V
                                        </span>
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#174775] bg-green-100 text-xs font-bold text-[#073763]">
                                            +
                                        </span>
                                    </div>

                                    <p className="text-xs text-blue-100">
                                        <span className="font-semibold text-white">
                                            Be part of the change.
                                        </span>{" "}
                                        Every small action matters.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
