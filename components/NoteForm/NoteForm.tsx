"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import type { NoteTag } from "@/types/note";
import { NOTE_TAGS } from "@/types/note";
import css from "./NoteForm.module.css";
import {createNote} from "@/lib/api";
import { useNoteDraftStore } from "@/stores/noteStore";
import { ChangeEvent } from "react";

interface NoteFormProps {
  tags: NoteTag[];
}

function NoteForm({ tags }: NoteFormProps) {
    const router = useRouter();
    const draft = useNoteDraftStore(state => state.draft);
    const setDraft = useNoteDraftStore(state => state.setDraft);
    const clearDraft = useNoteDraftStore(state => state.clearDraft);

    const {mutate} = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            clearDraft();
            router.push("/notes/filter/all");
        },
    });

    const handleCancel = () => {
        router.push("/notes/filter/all");
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({...draft, [event.target.name]: event.target.value})
    }


    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tag = formData.get("tag") as NoteTag;

        mutate({ title, content, tag });
    }

  const allTags: NoteTag[] = Array.from(new Set([...NOTE_TAGS, ...tags]));
  const defaultTag = allTags[0] ?? "Todo";

  return (
      <form action={handleSubmit} className={css.form}>
          <div className={css.formGroup }>
      <label htmlFor="title">
        Title
              <input id="title" type="text" name="title" required className={css.input } onChange={handleChange}/>
      </label>

      <label htmlFor="content">
        Content
        <textarea id="content" name="content" className={css.textarea} onChange={handleChange}/>
      </label>

      <label htmlFor="tag">
        Tags
        <select id="tag" name="tag" defaultValue={defaultTag} className={css.select} onChange={handleChange}>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>
</div>
      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>Submit</button>
        <button type="button" onClick={handleCancel} className={css.cancelButton }>Cancel</button>
      </div>
    </form>
  );
}

export default NoteForm;

