import { Suspense } from "react";
import EventForm from "../components/EventForm";
import { redirect, useRouteLoaderData, Await } from "react-router-dom";

const EditEventPage = () => {
  const { event } = useRouteLoaderData("event-detail");
  // const event = data.event

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Waiting</p>}>
      <Await resolve={event}>
        {(loadedEvent) => <EventForm method="PATCH" event={loadedEvent} />}
      </Await>
    </Suspense>
  );
};

export default EditEventPage;
