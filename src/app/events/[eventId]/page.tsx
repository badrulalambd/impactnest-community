
type Props = {
  params: Promise<{ eventId: string }>
}

const EventDetailPage = async ({ params }: Props) => {
    const { eventId } = await params;
    return (
        <div>
            Event Detail Page: {eventId}
        </div>
    );
};

export default EventDetailPage;