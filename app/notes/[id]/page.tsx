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
    title: note.title,
    description: note.content,
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
