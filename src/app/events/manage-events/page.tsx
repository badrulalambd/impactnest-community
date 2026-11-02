
import ManageEventsData from "@/components/events/ManageEventsDetail";
import { Suspense } from "react";

const ManageEventPage = async () => {
    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
                <ManageEventsData />
            </Suspense>
        </main>
    );
};

export default ManageEventPage;