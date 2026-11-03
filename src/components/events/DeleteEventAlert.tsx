
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogHeader,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenClient";

const DeleteEventAlert = ({ _id }: { _id: string }) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (isDeleting) return;

        setIsDeleting(true);

        const token = await getTokenFromClient();
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/events/single/${_id}`,
                {
                    cache: "no-cache",
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const responseData = await response.json();

            if (!response.ok || responseData.deletedCount <= 0) {
                throw new Error(
                    responseData.message || "Failed to delete event."
                );
            }

            // Close the alert dialog after successful deletion.
            setOpen(false);

            toast.success("Event deleted successfully!");

            // Refresh the current page to show the remaining events.
            window.location.reload();
            router.refresh();
        } catch (error) {
            console.error("Error deleting event:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete event. Please try again."
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button
                        type="button"
                        variant="outline"
                        className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-white px-4 py-5 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:text-sm"
                    >
                        <Trash2 className="h-4 w-4 shrink-0" />
                        <span>Delete</span>
                    </Button>
                }
            />

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this event.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(event) => {
                            event.preventDefault();
                            handleDelete();
                        }}
                        disabled={isDeleting}
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        {isDeleting ? "Deleting..." : "Confirm Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteEventAlert;
