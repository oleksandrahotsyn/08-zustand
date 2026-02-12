//notes/action/create/page.tsx

import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { getTags } from "@/lib/api"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note in NoteHub.",
  openGraph: {
    title: "Create note",
    description: "Create a new note in NoteHub.",
    url: "https://08-zustand-b5wc.vercel.app/notes/action/create",
    siteName: "NoteHub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

async function CreateNote() {
  const tags = await getTags();
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm tags={tags} />
      </div>
    </main>
  );
}

export default CreateNote;
