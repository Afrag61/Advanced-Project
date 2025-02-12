import EventForm from "../components/EventForm";

const NewEventPage = () => {
  // const data = useActionData();

  return (
    <>
      {/* <p>{data && data.message}</p> */}
      <EventForm method="post" />
    </>
  );
};

export default NewEventPage;


