export const NOTE_TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;
export type NoteTag = (typeof NOTE_TAGS)[number];

export function isNoteTag(value: string): value is NoteTag {
  return (NOTE_TAGS as readonly string[]).includes(value);
}

export function normalizeTag(value: string): NoteTag {
  return isNoteTag(value) ? value : "Todo";
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}
