import Form from "./Form";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen border">
      <h1 className="text-6xl font-bold text-[#F9C22E]">Shorten your links</h1>
      <p className="text-2xl font-light">Super Fast Redirections on the edge</p>
      <Form />
    </div>
  );
}
