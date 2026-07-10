import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
export function AppLayout() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
