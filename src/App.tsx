import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useMatch,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AuthProvider from "./pages/Auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Details from "./pages/Subpages/DetailsPage/Details";
import Navigation from "./components/layout/Navigation";
import AddBookPage from "./pages/Subpages/AddBookPage";
import Browse from "./pages/Subpages/Browse";
import Search from "./pages/Subpages/Search";
import Library from "./pages/Library";
import Reader from "./pages/Subpages/Reader";
import ResetPasswordRequest from "./pages/Auth/ResetPasswordRequest";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm";

function AppContent() {
  const location = useLocation();
  const matchReset = useMatch("/reset-password/:token");

  // only hide nav on these exact paths…
  const noNavExact = ["/login", "/register", "/reset-request"];
  const hideNav = noNavExact.includes(location.pathname) || Boolean(matchReset);

  return (
    <>
      {!hideNav && <Navigation />}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/details/:slug" element={<Details />} />
          <Route path="/search" element={<Search />} />
          <Route path="/read/:pdf_file/:slug" element={<Reader />} />
          <Route path="/addbook" element={<AddBookPage />} />
          <Route path="/library" element={<Library />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-request" element={<ResetPasswordRequest />} />
        <Route
          path="/reset-password/:token"
          element={<ResetPasswordConfirm />}
        />
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
