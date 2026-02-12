import { create } from "zustand";
import { CreateNotePayload } from "@/types/note";
import { title } from "process";

type NoteDraftStore = {
    draft: CreateNotePayload;
    setDraft: (note: CreateNotePayload) => void;
    clearDraft: () => void;
};

const initialDraft: CreateNotePayload = {
    title: '',
    content: '',
    tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()((set) => ({
    draft: initialDraft,
    setDraft: (note) => set({ draft: note }),
    clearDraft: () => set({ draft: initialDraft }),
}));