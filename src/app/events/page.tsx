
import EventsExplorer from "@/components/events/EventsExplorer";
import { getTokenFromServer } from "@/lib/getTokensServer";
import { IEventType } from "@/type/type";

const EventsPage = async () => {
  let events: IEventType[] = [];
  let hasError = false;

   const token = await getTokenFromServer();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/events`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const eventsData = await response.json();

    // Supports either a direct array or an object containing events.
    events = Array.isArray(eventsData)
      ? eventsData
      : Array.isArray(eventsData.events)
        ? eventsData.events
        : Array.isArray(eventsData.data)
          ? eventsData.data
          : [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    hasError = true;
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <EventsExplorer
        events={events}
        hasError={hasError}
      />
    </main>
  );
};

export default EventsPage;
