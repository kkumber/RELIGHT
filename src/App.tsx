import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import AuthProvider from "./utils/AuthProvider"
import ProtectedRoute from "./components/ProtectedRoute"
import Details from "./pages/Subpages/Details"
import Navigation from "./components/Navigation"
import AddBookPage from "./pages/Subpages/AddBookPage"

function App() {
  return (
    <div className="font-monaSans">
      <BrowserRouter> 
      <Navigation />
      <AuthProvider>
        <div className="mx-2 md:mx-20 lg:mx-32">
        <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/details/:slug" element={<Details />} />
              <Route path="/addbook" element={<AddBookPage />} />
            </Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
        </AuthProvider>

      </BrowserRouter>
    </div>
  )
}

export default App
