import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";

const PER_PAGE = 12;

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
};

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const toNoteTag = (value?: string): NoteTag | undefined => {
  if (!value) return undefined;
  return TAGS.includes(value as NoteTag) ? (value as NoteTag) : undefined;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const rawTag = slug?.[0] ?? "All";
  const tag = rawTag.toLowerCase() === "all" ? "All Notes" : rawTag;

  const title = `NoteHub - ${tag}`.trim();
  const description = `Browse notes tagged with "${tag}" on NoteHub, your digital note-taking app.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand.vercel.app/notes/${encodeURIComponent(rawTag)}`,
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
}

export default async function NotesByTagPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const sp = (await searchParams) ?? {};

  const rawTag = slug?.[0];
  const tag: NoteTag | undefined = rawTag?.toLowerCase() === "all" ? undefined : toNoteTag(rawTag);

  const parsedPage = Number.parseInt(sp.page ?? "1", 10);
  const initialPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const initialSearch = (sp.search ?? "").trim();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, initialPage, PER_PAGE, initialSearch],
    queryFn: () =>
      fetchNotes({
        tag,
        page: initialPage,
        perPage: PER_PAGE,
        search: initialSearch,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        tag={tag}
        initialPage={initialPage}
        initialSearch={initialSearch}
        perPage={PER_PAGE}
      />
    </HydrationBoundary>
  );
}
