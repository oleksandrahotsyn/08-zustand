"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./page.module.css";

function NotFound() {
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
