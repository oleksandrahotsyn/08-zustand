"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "@/lib/api";
import type { NotesResponse } from "@/lib/api";
import css from "./NotesPage.module.css";
import type { NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/EditNoteForm/EditNoteForm";
import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";

type NotesClientProps = {
  tag?: NoteTag;
  initialPage: number;
  initialSearch: string;
  perPage: number;
};


export default function NotesClient({
  tag,
  initialPage,
  initialSearch,
  perPage,
}: NotesClientProps) {
  const [page, setPage] = useState<number>(initialPage);
  const [search, setSearch] = useState<string>(initialSearch);
  const [isCreating, setIsCreating] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    setPage(1);
  }, [debouncedSearch]);

  const queryKey = useMemo(
    () => ["notes",tag, page, perPage, debouncedSearch] as const,
    [tag, page, perPage, debouncedSearch]
  );

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey,
    queryFn: () => fetchNotes({tag, page, perPage, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <div className={css.toolbar}>
        <div></div>
        <Pagination
          pageCount={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
        <SearchBox onChange={setSearch} />
       </div>

      <NoteList notes={notes} />
    </>
  );
}
