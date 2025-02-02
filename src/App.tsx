import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AuthProvider from "./utils/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Details from "./pages/Subpages/Details";
import Navigation from "./components/layout/Navigation";
import AddBookPage from "./pages/Subpages/AddBookPage";
import Browse from "./pages/Subpages/Browse";
import Search from "./pages/Subpages/Search";
import Library from "./pages/Library";
import Reader from "./pages/Subpages/Reader";

function App() {
  return (
    <div className="font-monaSans">
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/details/:slug" element={<Details />} />
              <Route path="/addbook" element={<AddBookPage />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              <Route path="/read/:pdf_file" element={<Reader />} />
            </Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
