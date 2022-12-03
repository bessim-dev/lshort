"use client";
import { useRouter } from "next/router";
import React from "react";
interface link {
  url: string;
}
async function addShortener(params: link) {
  const data = await fetch("/api/generate-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return data;
}
const Form = () => {
  const [url, seturl] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit");
    setloading(true);
    e.preventDefault();
    try {
      const data = await addShortener({ url });
      seturl("");
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <form
      className="flex gap-4 mt-8"
      method="post"
      action="/api/generate-url"
      onSubmit={handleSubmit}>
      <input
        onChange={(e) => seturl(e.target.value)}
        type="text"
        placeholder="Paste your link here"
        name="link"
        value={url}
        required
        className="w-96 h-12 px-4 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9C22E] focus:border-transparent"
      />
      <button
        disabled={loading}
        className="disabled:opacity-50 disabled:bg-yellow-700 w-32 h-12 px-4 text-lg font-bold text-white bg-[#F9C22E] hover:bg-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9C22E] focus:border-transparent">
        {loading ? "Shortening.." : "Shorten"}
      </button>
    </form>
  );
};

export default Form;
