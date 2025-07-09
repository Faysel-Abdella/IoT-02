import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginForm from "./Components/LoginForm/LoginForm";
// import HomePage from './Components/Design/HomePage';
import { initialData } from "./Components/constant/constant";
import { loadData } from "./store/reducer/reducer";
import { Provider, useDispatch } from "react-redux";

import "react-responsive-modal/styles.css";
import HomePage from "./Components/Design/HomePage";
import LoginForm from "./Components/LoginForm/LoginForm";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { store as createStore } from "./store";

const store = createStore();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load initial data
    dispatch(loadData(initialData));
  }, [dispatch]);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
