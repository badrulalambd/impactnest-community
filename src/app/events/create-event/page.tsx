import { Suspense } from "react";
import CreateEventForm from "@/components/events/CreateEventForm";

export default function CreateEventPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Suspense fallback={<div className="p-8 text-center">Loading form details...</div>}>
        <CreateEventForm />
      </Suspense>
    </main>
  );
}

