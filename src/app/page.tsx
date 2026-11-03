import Banner from "@/components/home/Banner";
import CommunityFeatures from "@/components/home/CommunityFeatures";
import CommunityPastEventsGallery from "@/components/home/CommunityPastEventsGallery";
import Newsletter from "@/components/home/Newsletter";
import RecentUpcomingEvents from "@/components/home/RecentUpcomingEvents";

export default function Home() {
  return (
    <div>
      <Banner />
      <CommunityFeatures />
      <RecentUpcomingEvents />
      <CommunityPastEventsGallery />
      <Newsletter />
    </div>
  );
}
