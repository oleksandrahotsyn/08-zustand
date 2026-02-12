import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getNote } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface NoteProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: NoteProps): Promise<Metadata> => {
  const { id } = await params;
  const note = await getNote(id);

  return {
    title: note.title.trim(),
    description: note.content,
    openGraph: {
      title: note.title.trim(),
      description: note.content,
      url: `https://08-zustand-b5wc.vercel.app/notes/${id}`,
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
};

async function Note({ params }: NoteProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default Note;
