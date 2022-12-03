/* eslint-disable @next/next/no-head-element */
import { Open_Sans } from "@next/font/google";
import "./globals.css";

const font = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={font.className} lang="en">
      <head>
        <title>Bessim Boujebli • Freelance Designer & Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Helping people design and build interactive websites from scratch."
        />
      </head>
      <body className="container mx-auto bg-gradient-to-r from-white to-indigo-50 select-none">
        <main>{children}</main>
        <footer className="w-full text-center fixed bottom-0 left-0">
          <a
            href="https://www.linkedin.com/in/bessim-boujebli/"
            target="_blank"
            rel="noreferrer">
            Made with ♡ by Bessim
          </a>
        </footer>
      </body>
    </html>
  );
}
