import { getTags } from "@/lib/api";
import Link from "next/link";
import css from "./SidebarNotes.module.css";

async function NotesSidebar() {
    const tags = await getTags();
    return (<ul className={css.menuList}>
        <li className={css.menuItem}>
            <Link className={css.menuLink} href="/notes/filter/all">All notes</Link>
        </li>
                {tags.map((tag) => (
            <li className={css.menuItem} key={tag}>
                <Link className={css.menuLink} href={`/notes/filter/${encodeURIComponent(tag)}`}>{tag}</Link>
            </li>
        )) }
    </ul>)
}

export default NotesSidebar;