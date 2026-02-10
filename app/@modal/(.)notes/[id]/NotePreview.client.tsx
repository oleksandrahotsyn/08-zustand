"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import type { Note } from "@/types/note";
import { getNote } from "@/lib/api";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function NotePreviewClient() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => getNote(id!),
    enabled: Boolean(id),
    refetchOnMount: false,
    retry: 1,
  });

  return (
    <Modal onClose={() => router.back()}>
      {!id && (
        <div style={{ padding: 16 }}>
          <p>Missing note id.</p>
          <button type="button" onClick={() => router.back()}>
            Back
          </button>
        </div>
      )}

      {id && isLoading && (
        <div style={{ padding: 16 }}>
          <p>Loading note…</p>
        </div>
      )}

      {id && isError && (
        <div style={{ padding: 16 }}>
          <p>Failed to load note.</p>
          <p style={{ opacity: 0.7, marginTop: 8 }}>
            {error instanceof Error ? error.message : "Unknown error"}
          </p>

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button type="button" onClick={() => router.back()}>
              Back
            </button>
          </div>
        </div>
      )}

      {id && !isLoading && !isError && data && (
        <div style={{ position: "relative" }}>
          {isFetching && (
            <div style={{ padding: 8, fontSize: 12, opacity: 0.7 }}>
              Updating…
            </div>
          )}

          <NotePreview note={data} onBack={() => router.back()} />
        </div>
      )}

      {id && !isLoading && !isError && !data && (
        <div style={{ padding: 16 }}>
          <p>Note not found.</p>
          <button type="button" onClick={() => router.back()}>
            Back
          </button>
        </div>
      )}
    </Modal>
  );
}

