
"use client";

import {
    useEffect,
    useState,
    type FormEvent,
    type ChangeEvent,
} from "react";
import { createPortal } from "react-dom";
import type { IEventType } from "@/type/type";
import {
    Edit3,
    X,
    CalendarDays,
    MapPin,
    Image as ImageIcon,
    Tag,
    LoaderCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenClient";

interface EditEventDialogProps {
    event: IEventType;
    onUpdated: (updatedEvent: IEventType) => void;
}

const API_BASE_URL =
    process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL;

const EVENT_TYPES = [
    "Social Development",
    "Health & Blood Donation",
    "Skills & Career",
    "Cultural",
    "Sports",
    "Relief",
    "Other",
];

const EditEventDialog = ({
    event,
    onUpdated,
}: EditEventDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [formData, setFormData] = useState({
        title: event.title ?? "",
        type: event.type ?? "",
        date: event.date ? event.date.slice(0, 10) : "",
        location: event.location ?? "",
        imageUrl: event.imageUrl ?? "",
        description: event.description ?? "",
    });

    // Enable portals only after mounting in the browser.
    useEffect(() => {
        setMounted(true);
    }, []);

    // Populate the form whenever the selected event changes.
    useEffect(() => {
        setFormData({
            title: event.title ?? "",
            type: event.type ?? "",
            date: event.date ? event.date.slice(0, 10) : "",
            location: event.location ?? "",
            imageUrl: event.imageUrl ?? "",
            description: event.description ?? "",
        });
    }, [event]);

    // Prevent background scrolling while the dialog is open.
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isUpdating) {
                handleCancel();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, isUpdating]);

    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            title: event.title ?? "",
            type: event.type ?? "",
            date: event.date ? event.date.slice(0, 10) : "",
            location: event.location ?? "",
            imageUrl: event.imageUrl ?? "",
            description: event.description ?? "",
        });
    };

    const handleCancel = () => {
        if (isUpdating) return;

        resetForm();
        setIsOpen(false);
    };

    const handleUpdate = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (isUpdating) return;

        if (!API_BASE_URL) {
            toast.error("API URL is not configured.");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(`${formData.date}T00:00:00`);

        if (
            !formData.date ||
            Number.isNaN(selectedDate.getTime())
        ) {
            toast.error("Please select a valid event date.");
            return;
        }

        if (selectedDate < today) {
            toast.error("The event date cannot be in the past.");
            return;
        }

        setIsUpdating(true);

        try {
            const token = await getTokenFromClient();
            const response = await fetch(
                `${API_BASE_URL}/events/${encodeURIComponent(event._id)}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json().catch(() => null);

            if (!response.ok || result?.error) {
                throw new Error(
                    result?.message ||
                    result?.error ||
                    "Failed to update the event."
                );
            }

            // Update the event card in the parent component.
            onUpdated({
                ...event,
                ...formData,
            });

            setIsOpen(false);
            toast.success("Event updated successfully!");
        } catch (error) {
            console.error("Error updating event:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while updating the event."
            );
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            {/* Edit button remains inside the event card. */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-brand-orange/40 hover:bg-orange-50 hover:text-[#e86e00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900] focus-visible:ring-offset-2 sm:text-sm"
            >
                <Edit3 className="h-4 w-4 shrink-0" />
                <span>Edit</span>
            </button>

            {/* Portal renders the dialog directly under document.body. */}
            {mounted &&
                isOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
                        onMouseDown={(e) => {
                            if (e.target === e.currentTarget) {
                                handleCancel();
                            }
                        }}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="edit-event-title"
                            className="relative my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-2xl"
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            {/* Dialog header */}
                            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
                                <div>
                                    <h2
                                        id="edit-event-title"
                                        className="text-xl font-bold text-[#073763] sm:text-2xl"
                                    >
                                        Edit Event
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Update your event details below.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={isUpdating}
                                    aria-label="Close dialog"
                                    className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Editable event form */}
                            <form
                                onSubmit={handleUpdate}
                                className="p-5 sm:p-7"
                            >
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    {/* Event title */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor={`edit-title-${event._id}`}
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Event Title
                                        </label>

                                        <input
                                            id={`edit-title-${event._id}`}
                                            name="title"
                                            type="text"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Enter event title"
                                            required
                                            maxLength={150}
                                            disabled={isUpdating}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#FF7900] focus:ring-2 focus:ring-orange-100 disabled:bg-slate-50"
                                        />
                                    </div>

                                    {/* Event type */}
                                    <div>
                                        <label
                                            htmlFor={`edit-type-${event._id}`}
                                            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                                        >
                                            <Tag className="h-4 w-4 text-[#FF7900]" />
                                            Event Type
                                        </label>

                                        <select
                                            id={`edit-type-${event._id}`}
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            required
                                            disabled={isUpdating}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FF7900] focus:ring-2 focus:ring-orange-100 disabled:bg-slate-50"
                                        >
                                            <option value="" disabled>
                                                Select event type
                                            </option>

                                            {formData.type &&
                                                !EVENT_TYPES.includes(formData.type) && (
                                                    <option value={formData.type}>
                                                        {formData.type}
                                                    </option>
                                                )}

                                            {EVENT_TYPES.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Event date */}
                                    <div>
                                        <label
                                            htmlFor={`edit-date-${event._id}`}
                                            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                                        >
                                            <CalendarDays className="h-4 w-4 text-[#FF7900]" />
                                            Event Date
                                        </label>

                                        <input
                                            id={`edit-date-${event._id}`}
                                            name="date"
                                            type="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={(() => {
                                                const now = new Date();
                                                const year = now.getFullYear();
                                                const month = String(
                                                    now.getMonth() + 1
                                                ).padStart(2, "0");
                                                const day = String(
                                                    now.getDate()
                                                ).padStart(2, "0");

                                                return `${year}-${month}-${day}`;
                                            })()}
                                            required
                                            disabled={isUpdating}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FF7900] focus:ring-2 focus:ring-orange-100 disabled:bg-slate-50"
                                        />
                                    </div>

                                    {/* Event location */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor={`edit-location-${event._id}`}
                                            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                                        >
                                            <MapPin className="h-4 w-4 text-[#FF7900]" />
                                            Event Location
                                        </label>

                                        <input
                                            id={`edit-location-${event._id}`}
                                            name="location"
                                            type="text"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Enter event location"
                                            required
                                            maxLength={250}
                                            disabled={isUpdating}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#FF7900] focus:ring-2 focus:ring-orange-100 disabled:bg-slate-50"
                                        />
                                    </div>

                                    {/* Event image URL */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor={`edit-imageUrl-${event._id}`}
                                            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                                        >
                                            <ImageIcon className="h-4 w-4 text-[#FF7900]" />
                                            Event Image URL
                                        </label>

                                        <input
                                            id={`edit-imageUrl-${event._id}`}
                                            name="imageUrl"
                                            type="url"
                                            value={formData.imageUrl}
                                            onChange={handleChange}
                                            placeholder="https://example.com/event-image.jpg"
                                            required
                                            disabled={isUpdating}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#FF7900] focus:ring-2 focus:ring-orange-100 disabled:bg-slate-50"
                                        />

                                        {formData.imageUrl && (
                                            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                                                <img
                                                    src={formData.imageUrl}
                                                    alt="Event image preview"
                                                    className="h-40 w-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = "none";
                                                    }}
                                                    onLoad={(e) => {
                                                        e.currentTarget.style.display = "block";
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Event description */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor={`edit-description-${event._id}`}
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Event Description
                                        </label>

                                        <textarea
                                            id={`edit-description-${event._id}`}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Describe the purpose of your event..."
                                            rows={5}
                                            required
                                            maxLength={3000}
                                            disabled={isUpdating}
                                            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#FF7900] focus:ring-2 focus:ring-orange-100 disabled:bg-slate-50"
                                        />

                                        <p className="mt-1 text-right text-xs text-slate-400">
                                            {formData.description.length}/3000 characters
                                        </p>
                                    </div>
                                </div>

                                {/* Dialog footer */}
                                <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={isUpdating}
                                        className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF7900] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            "Update Event"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default EditEventDialog;
