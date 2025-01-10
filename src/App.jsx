import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostPage from "./pages/SinglePostPage";
import PostsPage from "./pages/PostsPage";
import DefaultLayout from "./pages/DefaultLayout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import MyFormPage from "./pages/MyFormPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route index Component={HomePage} />
          <Route path="/about" Component={AboutPage} />
          <Route path="/posts">
            <Route index Component={PostsPage} />
            <Route path=":id" Component={PostPage} /> {/*parametro dinamico*/}
            <Route path="add-post" Component={MyFormPage} />
          </Route>
        </Route>
        {/* rotta di fallback per gestire url e pagini non presenti */}
        <Route path="*" Component={NotFoundPage}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;