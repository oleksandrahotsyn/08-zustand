import Link from "next/link";
import css from "./ProfileLayout.module.css";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>
        <nav>
          <ul className={css.menu}>
            <li>
              <Link className={css.link} href="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link className={css.link} href="/profile/notifications">
                Notifications
              </Link>
            </li>
            <li>
              <Link className={css.link} href="/profile/settings">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className={css.content}>{children}</main>
    </div>
  );
}

export default ProfileLayout;
