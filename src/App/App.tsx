import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import { EditingArea, ProjectManagment, TaskManagment, NotFoundPage } from "../components";

function AppContent() {
  const location = useLocation();
  const isNotFoundPage = location.pathname === "/404";

  return (
    <div className={styles.mainContainer}>
      {!isNotFoundPage && <ProjectManagment />}
      {!isNotFoundPage && <TaskManagment />}
      <Routes>
        <Route path="/" element={<EditingArea />} />
        <Route path="/task/:taskId" element={<EditingArea />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
