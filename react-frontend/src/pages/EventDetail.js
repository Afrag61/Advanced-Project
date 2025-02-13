import { Suspense } from "react";
import { useRouteLoaderData, redirect, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailsPage = () => {
  const { events, event } = useRouteLoaderData("event-detail");
  // const event = data.event;

  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading selected event...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading events...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailsPage;

const loadEvent = async (id) => {
  const response = await fetch(`http://192.168.1.3:8080/events/${id}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        Message: "Could not fetch details for selected event.",
      }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
};

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

export const loader = async ({ request, params }) => {
  const id = params.eventId;

  return { events: loadEvents(), event: loadEvent(id) };
};

export const action = async ({ params, request }) => {
  const eventId = params.eventId;

  const response = await fetch(`http://192.168.1.3:8080/events/${eventId}`, {
    method: request.method,
  });
  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not delete event !" }),
      { status: 500 }
    );
  } else {
    return redirect("/events");
  }
};
