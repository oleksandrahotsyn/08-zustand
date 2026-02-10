import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

type FetchNotesParams = {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
};

export async function deleteNote(id: Note["id"]): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export async function getNote(id:Note["id"]) {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search?.trim() ? { search: search.trim() } : {}),
      ...(tag ? { tag } : {}),
    },
  });

  return data;
}

type CreateNoteParams = {
  title: string;
  content?: string;
  tag: NoteTag;
};

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteParams): Promise<Note> {
  const payload = {
    title: title.trim(),
    tag,
    ...(content?.trim() ? { content: content.trim() } : {}),
  };

  const { data } = await api.post<Note>("/notes", payload);
  return data;
}

type UpdateNotePayload = {
  title: string;
  content: string;
  tag: NoteTag;
};

export async function updateNote(
  id: Note["id"],
  payload: UpdateNotePayload
): Promise<Note> {
  const { data } = await api.patch<Note>(`/notes/${id}`, payload);
  return data;
}


export async function getTags() {
  const { data } = await api.get<NotesResponse>("/notes");

  const tags = Array.from(
    new Set(data.notes.map(note => note.tag).filter(Boolean))
  );

  return tags;
}
