import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginForm from "./Components/LoginForm/LoginForm";
// import HomePage from './Components/Design/HomePage';
import { initialData } from "./Components/constant/constant";
import { loadData } from "./store/reducer/reducer";
import { useDispatch } from "react-redux";

import "react-responsive-modal/styles.css";
import HomePage from "./Components/Design/HomePage";
import LoginForm from "./Components/LoginForm/LoginForm";
import PdfGenerator from "./Components/modal/components/pdfFile";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load initial data
    dispatch(loadData(initialData));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route
          path="/home"
          element={
            <DndProvider backend={HTML5Backend}>
              <HomePage />{" "}
            </DndProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
