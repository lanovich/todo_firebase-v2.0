import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from "./App.module.css";
import { EditingArea, ProjectManagment, TaskManagment } from "../components";

function App() {
  return (
    <Router>
      <div className={styles.mainContainer}>
        <ProjectManagment />
        <TaskManagment />
        <Routes>
          <Route path="/" element={<EditingArea />} />
          <Route path="/:taskId" element={<EditingArea />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
