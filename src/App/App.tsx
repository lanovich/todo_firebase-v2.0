import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { EditingArea, NotFoundPage, TaskManagment } from "../features";
import { Layout } from "./Layout";


const App: React.FC = () => {
  return (
      <Routes>
        <Route
          path="/project/:projectId"
          element={
            <Layout>
              <TaskManagment />
              <EditingArea />
            </Layout>
          }
        >
          <Route path="task/:taskId" element={<EditingArea />} />
        </Route>

        <Route
          path="/"
          element={
            <Layout>
              <TaskManagment />
              <EditingArea />
            </Layout>
          }
        />

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
  );
};

export default App;
