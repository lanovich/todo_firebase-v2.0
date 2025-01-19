import styles from "./App.module.css";
import { ProjectManagment } from "../features";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      <ProjectManagment />
      <>
        {children}
      </>
    </div>
  );
};