import Form from "./Form";
import { PrismaClient } from "@prisma/client";
import Card from "./Card";

const prisma = new PrismaClient();
const getShortenedUrls = async () => {
  const data = await prisma.shortLink.findMany({
    select: {
      id: true,
      slug: true,
      url: true,
      screenshot: true,
      title: true,
    },
  });
  return data;
};
export default async function Page() {
  const urls = await getShortenedUrls();
  console.log(urls);
  return (
    <div className="flex flex-col items-center justify-center h-screen border">
      <h1 className="text-6xl font-bold text-[#F9C22E]">Shorten your links</h1>
      <p className="text-2xl font-light">Super Fast Redirections on the edge</p>
      <Form />
      <ul className="grid grid-cols-4">
        {urls.map((url) => (
          <Card key={url.id} {...url} />
        ))}
      </ul>
    </div>
  );
}
