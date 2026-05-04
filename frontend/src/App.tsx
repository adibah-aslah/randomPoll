import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/homePage/homePage";
import NotFoundPage from "@/pages/404/notFoundPage";

function App() {
  return (
    <BrowserRouter>
      {/**
       * Later can put Header or Navbar
       */}
      <main className="min-h-screen bg-background text-foreground py-8">
        <Routes>
          {/**
           * Main page route
           */}
          <Route path="/" element={<HomePage />} />

          {/**
           * Fallback route
           */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
