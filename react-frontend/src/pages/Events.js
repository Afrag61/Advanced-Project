import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();

  // if(data.isError){
  //   return <p>{data.message}</p>
  // }

  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export const loader = async () => {
  const response = await fetch("http://192.168.1.3:8080/events");

  if (!response.ok) {
    // return{isError: true, message: 'Could not fetch events!'}
    throw new Response(JSON.stringify({ message: "Could not fetch events !" }),
    { status: 500 })
  } else {
    return response;
  }
};

export default EventsPage;
