import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PostPage from "./pages/SinglePostPage";
import PostsPage from "./pages/PostsPage";
import DefaultLayout from "./pages/DefaultLayout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import MyFormPage from "./pages/MyFormPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AlertContext } from "./context/AlertContext";
import { TagContext } from "./context/TagContext";

function App() {
  //STATI di alert e tag
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [tagList, setTagList] = useState([]);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      <TagContext.Provider value={{ tagList, setTagList }}>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route index Component={HomePage} />
              <Route path="/about" Component={AboutPage} />
              <Route path="/posts">
                <Route index Component={PostsPage} />
                <Route path=":id" Component={PostPage} /> {/* parametro dinamico */}
                <Route path="add-post" Component={MyFormPage} />
              </Route>
            </Route>
            {/* rotta di fallback per gestire url e pagine non presenti */}
            <Route path="*" Component={NotFoundPage}></Route>
          </Routes>
        </BrowserRouter>
      </TagContext.Provider>
    </AlertContext.Provider>
  );
}

export default App;