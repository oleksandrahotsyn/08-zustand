import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

import NotesClient from "./Notes.client"; 
import { fetchNotes } from "@/lib/api";

const PER_PAGE = 12;

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function NotesByTagPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = (await searchParams) ?? {};

  const tag = slug?.[0] === "all" ? undefined : slug?.[0];

  const parsedPage = Number.parseInt(sp.page ?? "1", 10);
  const initialPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

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
