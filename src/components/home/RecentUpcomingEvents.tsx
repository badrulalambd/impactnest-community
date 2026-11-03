
const RecentUpcomingEvents = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/recentevents`, {
        method: "GET",
    });
    const recentSixEvents = await res.json();
    console.log("Recent 6 Events: ", recentSixEvents);

    return (
        <div>
            <div>
                Recent Events
            </div>
            <div>
                <h2>{recentSixEvents[0].title}</h2>
                <h2>{recentSixEvents[0].type}</h2>
                <h2>{recentSixEvents[0].date}</h2>
                <h2>{recentSixEvents[0].location}</h2>
                <h2>{recentSixEvents[0].imageUrl}</h2>
                <h2>{recentSixEvents[0].description}</h2>
            </div>
        </div>
    );
};

export default RecentUpcomingEvents;