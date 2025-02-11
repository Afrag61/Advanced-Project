import { useParams } from "react-router-dom";

const EventDetailsPage = () => {
  const params = useParams();
  const id = params.eventId;

  return (
    <>
      <h1>Event Detail</h1>
      <p> Event ID: {id}</p>
    </>
  );
};

export default EventDetailsPage;
