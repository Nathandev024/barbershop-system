import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
