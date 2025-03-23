import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AuthProvider, { useAccessTokenContext } from "./utils/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Details from "./pages/Subpages/Details";
import Navigation from "./components/layout/Navigation";
import AddBookPage from "./pages/Subpages/AddBookPage";
import Browse from "./pages/Subpages/Browse";
import Search from "./pages/Subpages/Search";
import Library from "./pages/Library";
import Reader from "./pages/Subpages/Reader";

function AppContent() {
  const location = useLocation();
  const noNavRoutes = ["/login", "/register"];

  return (
    <>
      {!noNavRoutes.includes(location.pathname) && <Navigation />}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/details/:slug" element={<Details />} />
          <Route path="/addbook" element={<AddBookPage />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/read/:pdf_file/:slug" element={<Reader />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="font-monaSans">
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
