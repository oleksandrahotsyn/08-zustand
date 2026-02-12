//"use client";
import type { Metadata } from "next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Not found Page",
  description: "The page you are looking for does not exist.",
  openGraph: {
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
    url: "https://08-zustand/not-found",
    siteName: "NoteHub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page Not Found",
      },
    ],
  },
};

export function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timerID = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => {
      clearTimeout(timerID);
    };
  }, [router]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>404 NotFound Page</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
