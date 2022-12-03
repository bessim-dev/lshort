import Form from "./Form";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getShortenedUrls = async () => {
  const data = await prisma.shortLink.findMany({
    select: {
      id: true,
      url: true,
      slug: true,
      createdAt: true,
    },
  });
  return data;
};
export default async function Page() {
  const urls = await getShortenedUrls();
  return (
    <div className="flex flex-col items-center justify-center h-screen border">
      <h1 className="text-6xl font-bold text-[#F9C22E]">Shorten your links</h1>
      <p className="text-2xl font-light">Super Fast Redirections on the edge</p>
      <Form />
      <ul>
        {urls.map((url) => (
          <li key={url.id}>
            {url.url} - {url.slug}
          </li>
        ))}
      </ul>
    </div>
  );
}
