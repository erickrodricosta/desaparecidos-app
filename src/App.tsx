import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

const DetailsPage = lazy(() => import("./pages/DetailsPage"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <p>Carregando...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pessoa/:id" element={<DetailsPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
