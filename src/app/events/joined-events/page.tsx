import React from 'react';

const JoinedEventsPage = () => {
  return (
    <div>
      Joined Events coming soon....
    </div>
  );
};

export default JoinedEventsPage;


// import Link from "next/link";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import {
//   ArrowRight,
//   CalendarDays,
//   CheckCircle2,
//   Clock,
//   Heart,
//   MapPin,
//   Sparkles,
//   Users,
// } from "lucide-react";
// import { getTokenFromServer } from "@/lib/getTokensServer";

// interface JoinedEvent {
//   _id: string;
//   userEmail: string;
//   title: string;
//   type: string;
//   date: string;
//   location: string;
//   imageUrl: string;
//   description: string;
//   email: string;
// }

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL;

// function getDateKey(date: string) {
//   return date.slice(0, 10);
// }

// function formatEventDate(date: string) {
//   const dateKey = getDateKey(date);
//   const [year, month, day] = dateKey.split("-").map(Number);

//   // Parse date-only values without UTC timezone shifting.
//   const parsedDate = new Date(year, month - 1, day);

//   return {
//     day: parsedDate.toLocaleDateString("en-US", {
//       day: "2-digit",
//     }),
//     month: parsedDate.toLocaleDateString("en-US", {
//       month: "short",
//     }),
//     full: parsedDate.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     }),
//   };
// }

// function getTodayKey() {
//   const now = new Date();

//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const day = String(now.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// }

// const JoinedEventsPage = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const user = session?.user;

//   if (!user?.email) {
//     return (
//       <main className="min-h-screen bg-[#F8FAFC] px-5 py-24">
//         <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
//           <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-[#FF7900]">
//             <Users size={30} />
//           </div>

//           <h1 className="text-2xl font-extrabold text-[#073763]">
//             Sign in to see your events
//           </h1>

//           <p className="mt-3 leading-7 text-slate-600">
//             Sign in to explore the community events you have joined.
//           </p>

//           <Link
//             href="/login"
//             className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FF7900] px-6 py-3 font-bold text-white transition hover:bg-[#073763]"
//           >
//             Sign In <ArrowRight size={18} />
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   let joinedEvents: JoinedEvent[] = [];
//   let fetchFailed = false;

//   const token = await getTokenFromServer();
//   try {
//     if (!API_BASE_URL) {
//       throw new Error("API base URL is not configured.");
//     }

//     const res = await fetch(
//       `${API_BASE_URL}/joinedevents/${(user?.email)}`,
//       {
//         method: "GET",
//         cache: "no-store",
//         headers: {
//           authorization: `Bearer ${token}`
//         },
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch joined events.");
//     }

//     joinedEvents = await res.json();
//     console.log("Server Response for JoinedEvents: ", joinedEvents);
    
//   } catch (error) {
//     console.error("Error fetching joined events:", error);
//     fetchFailed = true;
//   }

//   const todayKey = getTodayKey();

//   // Keep today's events and future events, then sort by date.
//   const upcomingEvents = joinedEvents
//     .filter(
//       (event) =>
//         event.date &&
//         getDateKey(event.date) >= todayKey
//     )
//     .sort(
//       (a, b) =>
//         getDateKey(a.date).localeCompare(getDateKey(b.date))
//     );

//   return (
//     <main className="min-h-screen bg-[#F8FAFC] pb-20">
//       {/* Hero Banner */}
//       <section className="relative isolate overflow-hidden bg-[#073763]">
//         <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#FF7900]/20 blur-3xl" />
//         <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
//           <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
//             <div>
//               <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-orange-200 backdrop-blur">
//                 <Heart size={16} className="text-[#FF7900]" />
//                 Your Community Journey
//               </span>

//               <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
//                 Every event is a chance to{" "}
//                 <span className="text-[#FF7900]">make a difference.</span>
//               </h1>

//               <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
//                 Keep track of the community events you have joined.
//                 Get ready to connect with people, take action, and
//                 create positive change together.
//               </p>

//               <div className="mt-8 flex flex-wrap items-center gap-4">
//                 <Link
//                   href="/events"
//                   className="inline-flex items-center gap-2 rounded-xl bg-[#FF7900] px-6 py-3.5 font-bold text-white shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#073763]"
//                 >
//                   Explore More Events
//                   <ArrowRight size={19} />
//                 </Link>

//                 <div className="flex items-center gap-2 text-sm font-medium text-blue-100">
//                   <CheckCircle2 size={18} className="text-green-300" />
//                   Be part of the change
//                 </div>
//               </div>
//             </div>

//             {/* Summary Card */}
//             <div className="relative mx-auto w-full max-w-md">
//               <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8">
//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <p className="text-sm font-medium text-blue-100">
//                       Your upcoming events
//                     </p>
//                     <p className="mt-3 text-5xl font-extrabold text-white">
//                       {upcomingEvents.length}
//                     </p>
//                     <p className="mt-2 text-sm text-blue-100">
//                       {upcomingEvents.length === 1
//                         ? "event waiting for you"
//                         : "events waiting for you"}
//                     </p>
//                   </div>

//                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF7900] text-white shadow-lg">
//                     <CalendarDays size={28} />
//                   </div>
//                 </div>

//                 <div className="my-6 h-px bg-white/15" />

//                 <div className="flex items-center gap-4">
//                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-200">
//                     <Sparkles size={22} />
//                   </div>
//                   <div>
//                     <p className="font-bold text-white">
//                       Small actions, big impact
//                     </p>
//                     <p className="mt-1 text-sm leading-6 text-blue-100">
//                       Your participation helps build a stronger community.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-3xl border border-[#FF7900]/40" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Joined Events */}
//       <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-16">
//         <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
//           <div>
//             <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#FF7900]">
//               <span className="h-0.5 w-7 rounded-full bg-[#FF7900]" />
//               Your Commitments
//             </div>

//             <h2 className="text-3xl font-extrabold tracking-tight text-[#073763] sm:text-4xl">
//               Upcoming Joined Events
//             </h2>

//             <p className="mt-3 max-w-2xl leading-7 text-slate-600">
//               Your next opportunities to connect, contribute, and make
//               a meaningful difference.
//             </p>
//           </div>

//           {!fetchFailed && upcomingEvents.length > 0 && (
//             <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
//               <CalendarDays size={16} className="text-[#FF7900]" />
//               Sorted by event date
//             </div>
//           )}
//         </div>

//         {fetchFailed ? (
//           <div className="rounded-3xl border border-red-100 bg-white px-6 py-16 text-center">
//             <p className="text-lg font-bold text-[#073763]">
//               We couldn&apos;t load your events.
//             </p>
//             <p className="mt-2 text-slate-600">
//               Please try again in a moment.
//             </p>
//           </div>
//         ) : upcomingEvents.length === 0 ? (
//           <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm sm:px-12">
//             <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 text-[#FF7900]">
//               <CalendarDays size={36} />
//             </div>

//             <h3 className="mt-6 text-2xl font-extrabold text-[#073763]">
//               No upcoming events yet
//             </h3>

//             <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
//               {joinedEvents.length > 0
//                 ? "Your previously joined events have passed. Discover new opportunities to get involved in your community."
//                 : "You haven't joined an event yet. Find a cause you care about and take your first step toward making a difference."}
//             </p>

//             <Link
//               href="/upcoming-events"
//               className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FF7900] px-6 py-3.5 font-bold text-white transition hover:bg-[#073763]"
//             >
//               Discover Events
//               <ArrowRight size={19} />
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
//             {upcomingEvents.map((event) => {
//               const eventDate = formatEventDate(event.date);

//               return (
//                 <article
//                   key={event._id}
//                   className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-[#073763]/5"
//                 >
//                   {/* Event Image */}
//                   <div className="relative h-56 overflow-hidden bg-slate-100">
//                     <img
//                       src={event.imageUrl}
//                       alt={event.title}
//                       className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//                     />

//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

//                     <span className="absolute left-4 top-4 inline-flex max-w-[80%] items-center gap-1.5 truncate rounded-full border border-white/30 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#073763] shadow-sm">
//                       <Sparkles size={13} className="shrink-0 text-[#FF7900]" />
//                       <span className="truncate">{event.type}</span>
//                     </span>

//                     <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-white/20 bg-white/95 p-2.5 pr-4 shadow-lg">
//                       <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#073763] text-white">
//                         <span className="text-lg font-extrabold leading-5">
//                           {eventDate.day}
//                         </span>
//                         <span className="text-[10px] font-bold uppercase tracking-wider text-orange-200">
//                           {eventDate.month}
//                         </span>
//                       </div>

//                       <div>
//                         <p className="text-xs font-semibold text-slate-500">
//                           Event date
//                         </p>
//                         <p className="mt-0.5 text-sm font-bold text-[#073763]">
//                           {eventDate.full}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Event Details */}
//                   <div className="flex flex-1 flex-col p-5 sm:p-6">
//                     <h3 className="line-clamp-2 text-xl font-extrabold leading-7 text-[#073763] transition group-hover:text-[#FF7900]">
//                       {event.title}
//                     </h3>

//                     <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
//                       {event.description}
//                     </p>

//                     <div className="mt-5 space-y-3">
//                       <div className="flex items-start gap-3 text-sm text-slate-600">
//                         <MapPin
//                           size={18}
//                           className="mt-0.5 shrink-0 text-[#FF7900]"
//                         />
//                         <span className="line-clamp-2">{event.location}</span>
//                       </div>

//                       <div className="flex items-center gap-3 text-sm text-slate-600">
//                         <Clock
//                           size={18}
//                           className="shrink-0 text-[#FF7900]"
//                         />
//                         <span>
//                           {getDateKey(event.date) === todayKey
//                             ? "Happening today"
//                             : "Coming up soon"}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="mt-auto pt-6">
//                       <div className="mb-4 h-px bg-slate-100" />

//                       <Link
//                         href={`/events/${event._id}`}
//                         className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#073763] px-5 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-[#FF7900] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900] focus-visible:ring-offset-2"
//                       >
//                         View Detail
//                         <ArrowRight
//                           size={18}
//                           className="transition-transform group-hover:translate-x-1"
//                         />
//                       </Link>
//                     </div>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// };

// export default JoinedEventsPage;
