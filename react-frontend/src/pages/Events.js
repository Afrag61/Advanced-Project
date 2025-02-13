import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const {events} = useLoaderData();
  // const events = data.events;

  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

const loadEvents = async () => {
  const response = await fetch("http://192.168.1.3:8080/events");

  if (!response.ok) {
    // return{isError: true, message: 'Could not fetch events!'}
    throw new Response(
      JSON.stringify({ message: "Could not fetch events !" }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export const loader = () => {
  return {events:loadEvents()}
} 

export default EventsPage;
