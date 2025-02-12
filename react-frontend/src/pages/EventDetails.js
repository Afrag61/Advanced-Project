import EventItem from "./../components/EventItem";
import { useRouteLoaderData } from "react-router-dom";

const EventDetailsPage = () => {
  const data = useRouteLoaderData('event-detail')
  const event = data.event


  return (
    <EventItem event={event}/>
  );
};

export default EventDetailsPage;

export const Loader = async ({request, params}) => {
  const id = params.eventId

  const response = await fetch(`http://192.168.1.3:8080/events/${id}`)

  if(!response.ok){
    throw new Response(JSON.stringify({Message: 'Could not fetch details for selected event.'}), {status: 500})
  }else{
    return response
  }
}