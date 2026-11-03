
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { IEventType } from "@/type/type";
import { Button } from "../ui/button";
import { CheckCircle2, LoaderCircle, Users } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenClient";

interface JoinEventProps {
  eventDetail: IEventType;
}

const JoinEvent = ({ eventDetail }: JoinEventProps) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isJoined, setIsJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinEvent = async () => {
    if (!user?.email) {
      router.push(
        `/login?callbackURL=${encodeURIComponent(
          `/events/${eventDetail._id}`
        )}`
      );
      return;
    }

    if (isJoined || isJoining) return;

    setIsJoining(true);

    try {
      const joiningData = {
        userEmail: user.email,
        ...eventDetail,
      };

      const token = await getTokenFromClient();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/joinedevents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(joiningData),
        }
      );

      const resData = await res.json();

      if (res.ok && (resData.insertedId || resData.result?.insertedId)) {
        setIsJoined(true);
        toast.success("You have successfully joined the event!");
      } else if (
        res.status === 409 ||
        resData.message === "You have already joined this event."
      ) {
        setIsJoined(true);
        toast.success("You have already joined this event!");
      } else {
        toast.error(resData.message || "Unable to join this event. Please try again.");
      }
    } catch (error) {
      console.error("Error joining event:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleJoinEvent}
        disabled={isJoined || isJoining}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl
          px-6 py-6 font-bold text-white shadow transition-all duration-300
          ${isJoined
            ? "cursor-not-allowed bg-green-600 opacity-100"
            : "cursor-pointer bg-brand-orange shadow-brand-navy/20 hover:-translate-y-0.5 hover:bg-brand-navy hover:shadow-lg active:scale-95"
          }`}
      >
        {isJoining ? (
          <>
            <LoaderCircle size={20} className="animate-spin" />
            Joining...
          </>
        ) : isJoined ? (
          <>
            <CheckCircle2 size={20} strokeWidth={2.5} />
            Already Joined
          </>
        ) : (
          <>
            <Users size={20} strokeWidth={2.5} />
            Join the Event
          </>
        )}
      </Button>
    </div>
  );
};

export default JoinEvent;
