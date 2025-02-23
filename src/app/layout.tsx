import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie list",
  description: "Find your favourite movies here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"antialiased bg-background font-jetbrainsMono text-text flex justify-center items-center min-h-screen"}>
        <div className="w-10/12 p-8 mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
