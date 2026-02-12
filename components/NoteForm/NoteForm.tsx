"use client";
import type { NoteTag } from "@/types/note";
import { NOTE_TAGS } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  tags: NoteTag[];
}

interface NoteFormProps {
  tags: NoteTag[];
}

function NoteForm({ tags }: NoteFormProps) {
  const allTags: NoteTag[] = Array.from(new Set([...NOTE_TAGS, ...tags]));
  const defaultTag = allTags[0] ?? "Todo";

  return (
      <form className={css.form}>
          <div className={css.formGroup }>
      <label htmlFor="title">
        Title
              <input id="title" type="text" name="title" required className={css.input } />
      </label>

      <label htmlFor="content">
        Content
        <textarea id="content" name="content" className={css.textarea} />
      </label>

      <label htmlFor="tag">
        Tags
        <select id="tag" name="tag" defaultValue={defaultTag} className={css.select}>
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
        <button type="button" className={css.cancelButton }>Cancel</button>
      </div>
    </form>
  );
}

export default NoteForm;

