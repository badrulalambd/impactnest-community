
"use client";

import { useState, type FormEvent } from "react";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    FileText,
    Image as ImageIcon,
    Mail,
    MapPin,
    Tag,
    Type,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const eventTypes = [
    "Social Development",
    "Health & Blood Donation",
    "Skills & Career",
    "Cultural",
    "Sports",
    "Relief",
    "Other",
];

type EventFormData = {
    title: string;
    type: string;
    date: string;
    location: string;
    imageUrl: string;
    description: string;
    email: string;
};

const initialFormData: EventFormData = {
    title: "",
    type: "",
    date: "",
    location: "",
    imageUrl: "",
    description: "",
    email: "",
};

// Format today's date using local time, not UTC.
function getLocalDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#073763] focus:ring-4 focus:ring-[#073763]/10 disabled:cursor-not-allowed disabled:opacity-60";

const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

const iconClass =
    "pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400";

export default function CreateEventForm() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const router = useRouter();

    const [formData, setFormData] =
        useState<EventFormData>(initialFormData);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const today = getLocalDate();

    function handleChange(
        field: keyof EventFormData,
        value: string
    ) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        setMessage("");
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage("");

        // Validate the date again before submitting.
        if (formData.date < getLocalDate()) {
            setMessage("Please select today or a future date.");
            return;
        }

        setIsSubmitting(true);

        const fData = new FormData(e.currentTarget);
        const newEventData = Object.fromEntries(fData.entries());
        console.log("NewEvent Data: ", newEventData);

        try {
            // Replace this with your actual backend API request.
            console.log("EventFormData before Posting:", formData);
            const res = await fetch(`${process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/events`, {
                cache: 'no-store',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newEventData),
            });
            const resData = await res.json();
            console.log("Data from Server response: ", resData);
            if (resData.insertedId) {
                toast.success("Event created successfully!");
                router.push('/events');
                router.refresh();
            }
            // Clear the form after a successful API response instead.

        } catch {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="w-full bg-[#F8FAFC] px-4 py-8 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-3xl">
                {/* Back to Upcoming Events */}
                <Link
                    href="/upcoming-events"
                    className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-brand-navy transition-colors hover:text-[#FF7900] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#073763] focus-visible:ring-offset-4"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Upcoming Events
                </Link>

                {/* Form heading */}
                <div className="mb-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#073763]">
                        <CalendarDays className="h-4 w-4" />
                        COMMUNITY EVENTS
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
                        Create a New Event
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                        Bring people together. Share your event details
                        and inspire your community to make a difference.
                    </p>
                </div>

                {/* Form card */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-8"
                >
                    {/* Event title */}
                    <div>
                        <label htmlFor="title" className={labelClass}>
                            Event Title <span className="text-brand-orange">*</span>
                        </label>

                        <div className="relative">
                            <Type className={iconClass} />
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                maxLength={150}
                                placeholder="e.g. Community Clean-Up Drive"
                                value={formData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Event type and date */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="type" className={labelClass}>
                                Event Type <span className="text-brand-orange">*</span>
                            </label>

                            <div className="relative">
                                <Tag className={iconClass} />
                                <select
                                    id="type"
                                    name="type"
                                    required
                                    value={formData.type}
                                    onChange={(e) => handleChange("type", e.target.value)}
                                    className={`${inputClass} appearance-none pr-10 ${formData.type ? "" : "text-slate-400"
                                        }`}
                                >
                                    <option value="" disabled>
                                        Select event type
                                    </option>
                                    {eventTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="date" className={labelClass}>
                                Event Date <span className="text-brand-orange">*</span>
                            </label>

                            <div className="relative">
                                <CalendarDays className={iconClass} />
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    required
                                    min={today}
                                    value={formData.date}
                                    onChange={(e) => handleChange("date", e.target.value)}
                                    className={`${inputClass} min-h-11.5`}
                                />
                            </div>

                            <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-slate-500">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                                Dates must be in the future (today or later).
                            </p>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className={labelClass}>
                            Location / Venue <span className="text-brand-orange">*</span>
                        </label>

                        <div className="relative">
                            <MapPin className={iconClass} />
                            <input
                                id="location"
                                name="location"
                                type="text"
                                required
                                maxLength={250}
                                placeholder="Enter the event venue or address"
                                value={formData.location}
                                onChange={(e) => handleChange("location", e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Thumbnail URL */}
                    <div>
                        <label htmlFor="imageUrl" className={labelClass}>
                            Thumbnail Image URL{" "}
                            <span className="text-brand-orange">*</span>
                        </label>

                        <div className="relative">
                            <ImageIcon className={iconClass} />
                            <input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                required
                                placeholder="https://example.com/event-image.jpg"
                                value={formData.imageUrl}
                                onChange={(e) => handleChange("imageUrl", e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                            Provide a publicly accessible image URL for your event thumbnail.
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className={labelClass}>
                            Event Description{" "}
                            <span className="text-brand-orange">*</span>
                        </label>

                        <div className="relative">
                            <FileText className="pointer-events-none absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                            <textarea
                                id="description"
                                name="description"
                                required
                                minLength={10}
                                maxLength={5000}
                                rows={5}
                                placeholder="Describe your event, its purpose, activities, and how people can participate..."
                                value={formData.description}
                                onChange={(e) =>
                                    handleChange("description", e.target.value)
                                }
                                className={`${inputClass} min-h-36 resize-y pl-11`}
                            />
                        </div>

                        <p className="mt-2 text-right text-xs text-slate-400">
                            {formData.description.length}/5000 characters
                        </p>
                    </div>

                    {/* Contact email */}
                    <div>
                        <label htmlFor="email" className={labelClass}>
                            Organizer Email Address:  <span className="text-brand-orange">*</span>
                        </label>

                        <div className="relative">
                            <Mail className={iconClass} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={`${user?.email || ""}`}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="border-t border-slate-100 pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e86e00] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF7900]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
                        >
                            {isSubmitting ? "Submitting..." : "Create Event"}
                            {!isSubmitting && (
                                <CalendarDays className="h-4 w-4" />
                            )}
                        </button>

                        <p className="mt-3 text-xs leading-5 text-slate-400">
                            Fields marked with <span className="text-brand-orange">*</span>{" "}
                            are required.
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}
