import EventForm from "../components/EventForm";
import { redirect, useRouteLoaderData } from "react-router-dom";

const EditEventPage = () => {
    const data = useRouteLoaderData('event-detail')
    const event = data.event
    return (
        <EventForm method='PATCH' event={event} />
    );
}

export default EditEventPage;
