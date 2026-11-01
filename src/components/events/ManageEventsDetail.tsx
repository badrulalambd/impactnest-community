"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "../ui/button";

const API_URL = `${process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/events`;


const ManageEventsDetail = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    if (isPending) {
        return <p>Loading user information...</p>;
    }


    return (
        <div>
            {user ? (
                <p>Welcome, {user.name}</p>
            ) : (
                <p>Please sign in to manage events.</p>
            )}

            <Button className="mt-4">
                <Link href="/events/create-event">
                    Create New Event
                </Link>
            </Button>
        </div>
    );
};

export default ManageEventsDetail;