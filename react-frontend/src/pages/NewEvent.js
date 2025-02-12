import { useActionData, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

const NewEventPage = () => {
  const data = useActionData();

  return (
    <>
      <p>{data && data.message}</p>
      <EventForm />
    </>
  );
};

export default NewEventPage;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch("http://192.168.1.3:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not save event!" }), {
      status: 500,
    });
  } else {
    return redirect('/events')
  }
};
