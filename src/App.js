import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./components/AuthGuard";
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <AuthGuard><Dashboard /></AuthGuard>
        } />
      </Routes>
    </BrowserRouter>
  );
}
